import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Select } from '@chakra-ui/select'
import { dateOpts, longDateRangeOpts } from '@/lib/options'
import DateTabGroup from '@/components/DateTabGroup'

const CashRecordPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="交易明细" />
      {/* navigation */}
      <nav className="main_nav">
        <div className="nav-bar">
          <a className="left-item">
            <i className="iconfont iconallow-left" />
          </a>
          {/* <div class="nav-title"><img class="logo" src="images/logo.png"></div> */}
          <div className="nav-title">资金明细</div>
          {/* <div class="right-item">
          <button class="s-btn">充值记录</button>
      </div> */}
          {/* <div class="right-item"><i class="iconfont iconmail"></i><span class="red-dot"></span></div> */}
        </div>
      </nav>

      <div className="main-content">
        <DateTabGroup />
        {/* 暂无数据 */}
        {/* <div class="data_null"><img src="images/data_null.svg">
              <p>暂无数据</p>
          </div> */}
        <div className="list-container pt-2 section-padding">
          {Array(10)
            .fill('')
            .map((t, i) => (
              <div
                key={i}
                className="cash-record background-white"
                data-toggle="modal"
                data-target="#notifyModal"
              >
                <div className="info-col">
                  <div className="d-flex align-items-center">
                    <div className="record-title">充值</div>
                    <div className="time ml-2">2020-06-30 11:19</div>
                  </div>
                  <div className="status text-green">已完成</div>
                </div>
                <div>交易类型:充值</div>
                <div>交易金额:100</div>
                <div className="order-num">订单号:20160130123145675434</div>
              </div>
            ))}
        </div>
      </div>
      <FooterNavBar />
    </Layout>
  )
}

export default CashRecordPage
