import DateTabGroup from '@/components/DateTabGroup'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function withdrawRecord() {
  const router = useRouter()
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
        <DateTabGroup />

        <div className="list-container pt-2 section-padding">
          {Array(5)
            .fill('')
            .map((t, i) => (
              <div
                key={i}
                className="cash-record background-white"
                // onClick="location.href = 'withdrawal-record-detail.html'"
                onClick={() => router.push(`/withdraw/record/${i + 1}`)}
              >
                <div className="info-col">
                  <div className="d-flex align-items-center">
                    <div className="record-title">提领</div>
                    <div className="time ml-2">2020-06-30 11:19</div>
                  </div>
                  <div className="status">待处理</div>
                </div>
                <div>交易类型:提领</div>
                <div>交易金额:100</div>
                <div className="order-num">订单号:20160130123145675434</div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default withdrawRecord
