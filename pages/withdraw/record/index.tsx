import DateTabGroup from '@/components/DateTabGroup'
import EmptyHolder from '@/components/EmptyHolder'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { beforeDateRangeOpts, processStatusOpts } from '@/lib/options'
import { Withdraw } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

function withdrawRecord() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const [withdraws, setWithdraws] = useState<Withdraw[]>([])
  const { toDateRange, toDateTime, toOptionName, toCurrency } = useTransfer()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const fetchWithdraws = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getWithdrawList({
        start_at,
        end_at,
      })
      setWithdraws(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchWithdraws()
  }, [currentTab])
  return (
    <Layout>
      <HeaderTitleBar
        back
        backPath="/my"
        title="提领记录"
        extra={
          <button
            className="s-btn"
            onClick={() => router.push('/deposit/record')}
          >
            充值记录
          </button>
        }
      />
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

        <div className="list-container pt-2 section-padding">
          {isEmpty && <EmptyHolder />}
          {withdraws.map((t, i) => (
            <div
              key={i}
              className="cash-record background-white"
              // onClick="location.href = 'withdrawal-record-detail.html'"
              // onClick={() => router.push(`/withdraw/record/${i + 1}`)}
            >
              <div className="info-col">
                <div className="d-flex align-items-center">
                  <div className="record-title">提领</div>
                  <div className="time ml-2">{toDateTime(t.created_at)}</div>
                </div>
                <div>{toOptionName(processStatusOpts, t.status)}</div>
              </div>
              <div>交易类型:提领</div>
              <div>交易金额:{toCurrency(t.amount, 2)}</div>
              <div className="order-num">订单号: {t.sn}</div>
            </div>
          ))}
        </div>
      </div>
      <FooterNavBar />
    </Layout>
  )
}

export default withdrawRecord
