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
import { BetRecord, BetRecordSummary } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import _ from 'lodash'
import TabGroup from '@/components/TabGroup'
import Tab from '@/components/Tab'
import { beforeDateRangeOpts } from '@/lib/options'
import classNames from 'classnames'
const HistoryPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate, toCurrency, toDateRange } = useTransfer()
  const [summaries, setSummaries] = useState<BetRecordSummary[]>([])
  const totalInfo = useMemo(() => {
    return {
      count: _.sumBy(summaries, 'count'),
      amount: _.sumBy(summaries, (t) => +t.amount),
      result: _.sumBy(summaries, (t) => +t.result),
    }
  }, [summaries])
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])

  const fetchBetRecordSummary = async () => {
    loadingStart()
    try {
      const res = await API.getBetRecordSummary({
        start_at,
        end_at,
      })
      setSummaries(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecordSummary()
  }, [currentTab])
  return (
    <Layout>
      <HeaderTitleBar back title="帐务历史" />
      <>
        <div className="main-content">
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
              {summaries.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.count}</td>
                  <td>{toCurrency(+t.amount)}</td>
                  <td>{toCurrency(+t.result)}</td>
                  <td>
                    <Link href={`/history/${t.date}`}>
                      <img src="images/ic_history.svg" />
                    </Link>
                  </td>
                </tr>
              ))}
              <tr>
                <td>合計</td>
                <td>{totalInfo.count}</td>
                <td>{toCurrency(totalInfo.amount)}</td>
                <td
                  className={classNames({
                    'text-success': totalInfo.result > 0,
                    'text-danger': totalInfo.result < 0,
                  })}
                >
                  {toCurrency(totalInfo.result)}
                </td>
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
