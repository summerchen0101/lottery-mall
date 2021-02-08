import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import DateTabGroup from '@/components/DateTabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useTransfer from '@/utils/useTransfer'
import { BetRecord } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import _ from 'lodash'
const HistoryPage: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate, toCurrency, amountToCanWin } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])
  const betReocrdsByDate = useMemo(
    () => _.groupBy(betReocrds, (t) => toDate(t.created_at)),
    [betReocrds],
  )
  const fetchBetRecord = async () => {
    loadingStart()
    try {
      const res = await API.getBetRecordList()
      setBetRecords(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  const fetchBetRecordSummary = async () => {
    loadingStart()
    try {
      const res = await API.getBetRecordSummary()
      // setBetRecords(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecord()
    fetchBetRecordSummary()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="帐务历史" />
      <>
        <div className="main-content">
          {/* <DateTabGroup /> */}
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>日期</th>
                <th>笔数</th>
                <th>下注金额</th>
                <th>总收益</th>
                <th>明细</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(betReocrdsByDate).map(([date, bets], i) => (
                <tr key={i}>
                  <td>{date}</td>
                  <td>{bets.length}</td>
                  <td>{toCurrency(_.sumBy(bets, 'amount'))}</td>
                  <td>-</td>
                  <td>
                    <Link href={`/history/${date}`}>
                      <img src="images/ic_history.svg" />
                    </Link>
                  </td>
                </tr>
              ))}
              <tr>
                <td>合計</td>
                <td>10</td>
                <td>530</td>
                <td className="text-green">7.65</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="pinbottom-section">
          <ul className="acc-inner mt-1">
            <li className="acc-item px-5">
              <p>400.00</p>
              <span className="text-lighgray">累计流水</span>
            </li>
            <li className="divider" />
            <li className="acc-item px-5">
              <p className="text-green">76.00</p>
              <span className="text-lighgray">总收益</span>
            </li>
          </ul>
        </div> */}
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryPage
