import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { BetRecord } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import BettingItem from '@/components/BettingItem'
import { Box } from '@chakra-ui/layout'
import EmptyHolder from '@/components/EmptyHolder'
import { beforeDateRangeOpts } from '@/lib/options'

const BettingsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDateRange, toCurrency, amountToCanWin } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const fetchBetRecord = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getBetRecordList({
        start_at,
        end_at,
      })
      setBetRecords(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecord()
  }, [currentTab])
  return (
    <Layout>
      <HeaderTitleBar title="投資紀錄" />

      <Box className="main-content background-gray" pb="130px" h="100vh">
        <TabGroup justifyContent="space-between">
          {beforeDateRangeOpts.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={t.value === currentTab}
              onClick={() => setCurrentTab(t.value)}
            />
          ))}
        </TabGroup>
        <div className="list-container">
          {isEmpty && <EmptyHolder />}
          {betReocrds.map((bet, i) => (
            <BettingItem key={i} bet={bet} />
          ))}
        </div>
      </Box>

      <div className="pinbottom-section">
        <ul className="acc-inner mt-1">
          <li className="acc-item px-2">
            <p>{toCurrency(betReocrds.length, 0)}</p>
            <span className="text-lighgray">筆數</span>
          </li>
          <li className="divider"></li>
          <li className="acc-item px-2">
            <p>{(toCurrency(_.sumBy(betReocrds, 'amount')), 2)}</p>
            <span className="text-lighgray">累计注額</span>
          </li>
          <li className="divider"></li>
          <li className="acc-item px-2">
            <p className="text-green">
              {toCurrency(
                _.sumBy(betReocrds, (t) => amountToCanWin(t.amount, t.odds)),
                2,
              )}
            </p>
            <span className="text-lighgray">預估獲利</span>
          </li>
        </ul>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default BettingsPage
