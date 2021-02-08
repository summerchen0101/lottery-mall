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
      <HeaderTitleBar title="账务明细" extra={<UserBalance />} />
      <BettingSummaryInfo
        date={date}
        sum={_.sumBy(betReocrds, 'amount')}
        expect={_.sumBy(betReocrds, (t) => amountToCanWin(t.amount, t.odds))}
      />
      <div className="main-content background-gray" style={{ paddingTop: 105 }}>
        <div className="list-container">
          {betReocrds.map((bet, i) => (
            <BettingItem key={i} bet={bet} />
          ))}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryDetailPage