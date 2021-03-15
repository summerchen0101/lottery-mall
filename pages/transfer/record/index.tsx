import DateTabGroup from '@/components/DateTabGroup'
import EmptyHolder from '@/components/EmptyHolder'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { beforeDateRangeOpts, processStatusOpts } from '@/lib/options'
import { Transfer } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

function transferRecord() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const { toDateRange, toDateTime, toOptionName, toCurrency } = useTransfer()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const fetchTransfers = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getTransferList({
        start_at,
        end_at,
      })
      setTransfers(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchTransfers()
  }, [currentTab])
  return (
    <Layout>
      <HeaderTitleBar back backPath="/my" title="转移记录" />
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
          {transfers.map((t, i) => (
            <div
              key={i}
              className="cash-record background-white"
              // onClick="location.href = 'transferal-record-detail.html'"
              // onClick={() => router.push(`/transfer/record/${i + 1}`)}
            >
              <div className="info-col">
                <div className="d-flex align-items-center">
                  <div className="record-title">转移</div>
                  <div className="time ml-2">{toDateTime(t.created_at)}</div>
                </div>
                <div>{toOptionName(processStatusOpts, t.status)}</div>
              </div>
              <div>
                转移对象: {t.to_member.acc} [{t.to_member.name}]
              </div>
              <div>交易金额: {toCurrency(t.amount, 2)}</div>
              <div>余额: {toCurrency(t.from_balance, 2)}</div>
            </div>
          ))}
        </div>
      </div>
      <FooterNavBar />
    </Layout>
  )
}

export default transferRecord
