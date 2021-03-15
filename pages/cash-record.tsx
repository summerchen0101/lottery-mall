import ColorText from '@/components/ColorText'
import DateTabGroup from '@/components/DateTabGroup'
import EmptyHolder from '@/components/EmptyHolder'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { WalletRecType } from '@/lib/enums'
import {
  beforeDateRangeOpts,
  processStatusOpts,
  walletRecTypeOpts,
} from '@/lib/options'
import { WalletRec } from '@/lib/types'
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
  const [transfers, setWalletRecs] = useState<WalletRec[]>([])
  const { toDateRange, toDateTime, toOptionName, toCurrency } = useTransfer()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const noteLabelMap = useMemo(() => {
    return {
      [WalletRecType.Transfer]: '来源帐号',
      [WalletRecType.Bet]: '注单编号',
    }
  }, [])
  const fetchWalletRecs = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getWalletRecList({
        wallet_rec_type: 0,
        start_at,
        end_at,
      })
      setWalletRecs(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchWalletRecs()
  }, [currentTab])
  return (
    <Layout>
      <HeaderTitleBar back backPath="/my" title="资金纪录" />
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
              key={t.id}
              className="cash-record background-white"
              // onClick="location.href = 'transferal-record-detail.html'"
              // onClick={() => router.push(`/transfer/record/${i + 1}`)}
            >
              <div className="info-col">
                <div className="d-flex align-items-center">
                  <div className="record-title">
                    {toOptionName(walletRecTypeOpts, t.wallet_rec_type)}
                  </div>
                  <div className="time ml-2">{toDateTime(t.created_at)}</div>
                </div>
              </div>
              <div>
                金额: <ColorText num={t.amount} />
              </div>
              <div>余额: {toCurrency(t.balance, 2)}</div>
              <div>
                {noteLabelMap[t.wallet_rec_type] || '备注'}: {t.note || '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterNavBar />
    </Layout>
  )
}

export default transferRecord
