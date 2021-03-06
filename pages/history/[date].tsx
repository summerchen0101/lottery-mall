import React, { useEffect, useMemo, useState } from 'react'
import BettingItem from '@/components/BettingItem'
import BettingSummaryInfo from '@/components/BettingSummaryInfo'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import UserBalance from '@/components/UserBalance'
import { useRouter } from 'next/dist/client/router'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { BetRecord } from '@/lib/types'
import _ from 'lodash'
import moment from 'moment'
import MessageBadge from '@/components/MessageBadge'
import { Box } from '@chakra-ui/layout'

const HistoryDetailPage: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const date = useMemo(() => router.query.date as string, [router])
  const API = useRequest()
  const { toDate, toCurrency, amountToCanWin } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])

  const fetchBetRecord = async () => {
    loadingStart()
    try {
      const res = await API.getBetRecordList({
        start_at: moment(date).startOf('day').unix(),
        end_at: moment(date).endOf('day').unix(),
      })
      setBetRecords(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecord()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="账务明细" extra={<MessageBadge />} />
      <BettingSummaryInfo
        date={date}
        sum={_.sumBy(betReocrds, 'valid_amount')}
        result={_.sumBy(betReocrds, (t) => t.result)}
      />
      <Box className="main-content background-gray" h="100vh" pt="105px">
        <div className="list-container">
          {betReocrds.map((bet, i) => (
            <BettingItem key={i} bet={bet} />
          ))}
        </div>
      </Box>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryDetailPage
