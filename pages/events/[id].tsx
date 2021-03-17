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
import { BetRecord, Odds } from '@/lib/types'
import EmptyHolder from '@/components/EmptyHolder'
import { Box } from '@chakra-ui/layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'

const tabs = [
  { label: '全场反波胆', value: 'F' },
  { label: '半场反波胆', value: 'FH' },
]
const MarketPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('F')
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const { setBettingInfo, setEventInfo, eventInfo } = useGlobalProvider()
  const [, setBettingVisible] = usePopupContext('betting')
  const { fetchUserInfo, fetchBetSettings } = useService()
  const API = useRequest()
  const { toCurrency, toDateTime } = useTransfer()
  const [odds, setOdds] = useState<Odds[]>([])
  const router = useRouter()
  const id = useMemo(() => +router.query?.id, [router.query])

  const fetchEvent = async () => {
    try {
      const res = await API.getHandicapDetail(id)
      setEventInfo(res.data)
    } catch (err) {}
  }
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

  const handleBetting = async (odds: Odds) => {
    fetchBetSettings(currentSection)
    setBettingInfo(odds)
    setBettingVisible(true)
  }

  useEffect(() => {
    if (id) {
      Promise.all([fetchOdds(), fetchEvent()])
    }
  }, [id, currentSection])

  useEffect(() => {
    Promise.all([fetchUserInfo()])
  }, [])

  useEffect(() => {
    const timer = setInterval(fetchOdds, 1000 * 30)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="赛事详情" />

      <div className="main-content">
        {/* 赛事资讯 */}
        <div className="teaminfo-section background-red">
          <a className="left-item">
            <i className="iconfont iconallow-left" />
          </a>
          <div className="league-col">{eventInfo?.team_home?.league_name}</div>
          <div className="time-col">{toDateTime(eventInfo?.play_at)}</div>
          <div className="team-col">
            <div className="t1">{eventInfo?.team_home?.name}(主)</div>
            <div className="icon_vs">VS</div>
            <div className="t2">{eventInfo?.team_away?.name}</div>
          </div>
          {/* <div className="score-col">22:19</div> */}
        </div>

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
              交易累计：
              <span className="text-blue">
                {toCurrency(eventInfo?.bet_sum, 2)}
              </span>
            </div>
            {/* <div className="d-flex">
              <button className="title-bar-btn icon_btn">
                <i
                  className="iconfont iconbillboard"
                  data-toggle="modal"
                  data-target="#chartsModal"
                />
              </button>
              <CountDownReloadBtn />
            </div> */}
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
                    onClick={() => handleBetting(t)}
                  >
                    <div className="score">
                      {t.home_point}-{t.away_point}
                    </div>
                    <div className="profit text-red">
                      {(t.home_odds * 100).toFixed(2)}%
                    </div>
                    <div className="price">
                      ￥ {toCurrency(t.single_game_limit)}
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
