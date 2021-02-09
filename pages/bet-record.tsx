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

const BettingsPage: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate, toCurrency, amountToCanWin } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])
  const fetchBetRecord = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getBetRecordList()
      setBetRecords(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecord()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar title="交易明細" />
      <div className="pintop-section d-flex flex-column justify-content-center fixed">
        <ul className="acc-inner mt-1">
          <li className="acc-item px-2">
            <p>{betReocrds.length}</p>
            <span className="text-lighgray">筆數</span>
          </li>
          <li className="divider" />
          <li className="acc-item px-2">
            <p>{toCurrency(_.sumBy(betReocrds, 'amount'))}</p>
            <span className="text-lighgray">金額統計</span>
          </li>
          <li className="divider" />
          <li className="acc-item px-2">
            <p className="text-green">
              {toCurrency(
                _.sumBy(betReocrds, (t) => amountToCanWin(t.amount, t.odds)),
              )}
            </p>
            <span className="text-lighgray">預估獲利</span>
          </li>
        </ul>
      </div>
      <Box className="main-content background-gray" pt="105px" h="100vh">
        <div className="list-container">
          {isEmpty && <EmptyHolder />}
          {betReocrds.map((bet, i) => (
            <BettingItem key={i} bet={bet} />
          ))}
        </div>
      </Box>

      <FooterNavBar />
    </Layout>
  )
}

export default BettingsPage
