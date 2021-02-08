import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TradeRankPopup from '@/components/popups/TradeRankPopup'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import useService from '@/utils/useService'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Odds } from '@/lib/types'
import EmptyHolder from '@/components/EmptyHolder'
import { Box } from '@chakra-ui/layout'
import { useGlobalProvider } from '@/context/GlobalProvider'

const tabs = [
  { label: '全場反波膽', value: 'F' },
  { label: '半場反波膽', value: 'FH' },
]
const MarketPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('F')
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const { setBettingInfo, eventInfo } = useGlobalProvider()
  const { fetchUserInfo } = useService()
  const API = useRequest()
  const { toCurrency, toDateTime } = useTransfer()
  const [odds, setOdds] = useState<Odds[]>([])
  const router = useRouter()
  const id = useMemo(() => +router.query?.id, [router.query])

  const fetchOdds = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getOddsList({
        handicap_id: id,
        section_code: currentSection,
      })
      setOdds(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchOdds()
  }, [id, currentSection])
  useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar title="賽事詳情" />

      <div className="main-content">
        {/* 賽事資訊 */}
        {eventInfo && (
          <div className="teaminfo-section background-red">
            <a className="left-item">
              <i className="iconfont iconallow-left" />
            </a>
            <div className="league-col">{eventInfo.league.name}</div>
            <div className="time-col">{toDateTime(eventInfo.play_at)}</div>
            <div className="team-col">
              <div className="t1">{eventInfo.team_home.name}(主)</div>
              <div className="icon_vs">VS</div>
              <div className="t2">{eventInfo.team_away.name}</div>
            </div>
            <div className="score-col">22:19</div>
          </div>
        )}

        <div className="main-section section-padding">
          <TabGroup justifyContent="center">
            {tabs.map((t, i) => (
              <Tab
                key={i}
                label={t.label}
                active={currentSection === t.value}
                onClick={() => setCurrentSection(t.value)}
              />
            ))}
          </TabGroup>

          <div className="section-title-bar d-flex justify-content-between align-items-center">
            <div className="vol-col">
              成交量：<span className="text-blue">42,823,114</span>
            </div>
            <div className="d-flex">
              <button className="title-bar-btn icon_btn">
                <i
                  className="iconfont iconbillboard"
                  data-toggle="modal"
                  data-target="#chartsModal"
                />
              </button>
              <CountDownReloadBtn />
            </div>
          </div>
          {/* Tab panes */}
          {!isEmpty ? (
            <Box>
              <div className="tricks-item-thead d-flex">
                <div className="tricks-item-title">比分</div>
                <div className="tricks-item-title">获利</div>
                <div className="tricks-item-title">可交易</div>
              </div>
              <div className="list-container">
                {odds.map((t, i) => (
                  <div
                    key={i}
                    className="tricks-item"
                    data-toggle="modal"
                    data-target="#betlistModal"
                    onClick={() => setBettingInfo(t)}
                  >
                    <div className="score">
                      {t.home_point}-{t.away_point}
                    </div>
                    <div className="profit text-red">
                      {(t.odds * 100).toFixed(2)}%
                    </div>
                    <div className="price">
                      ￥ {toCurrency(t.bet_amount_limit)}
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          ) : (
            <EmptyHolder />
          )}
        </div>
      </div>
      <TradeRankPopup />
      <FooterNavBar />
    </Layout>
  )
}

export default MarketPage
