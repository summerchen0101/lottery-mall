import DateTabGroup from '@/components/DateTabGroup'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import React from 'react'

function withdrawRecordDetail() {
  return (
    <Layout>
      <HeaderTitleBar back title="提领详情" />
      <div className="main-content">
        <div className="main-section section-padding">
          <div className="cash-box my-3 d-flex flex-column justify-content-center">
            <div className="cash-num">100</div>
            <span>交易金额</span>
          </div>
          <ul className="info-inner border-bottom pb-3">
            <li className="info-item">
              <div className="info-item-title">交易方式:</div>
              <div className="info-item-content">银行卡</div>
            </li>
            <li className="info-item">
              <div className="info-item-title">交易类型:</div>
              <div className="info-item-content">提领</div>
            </li>
            <li className="info-item">
              <div className="info-item-title">提领状态:</div>
              <div className="info-item-content text-green">提领成功</div>
            </li>
          </ul>
          <ul className="info-inner pt-3">
            <li className="info-item">
              <div className="info-item-title">交易单号:</div>
              <div className="info-item-content">
                20160130123145675434
                <button className="icon_btn">
                  <i className="iconcopy iconfont" />
                </button>
              </div>
            </li>
            <li className="info-item">
              <div className="info-item-title">交易时间:</div>
              <div className="info-item-content">2020-06-30 11:19</div>
            </li>
            <li className="info-item">
              <div className="info-item-title">交易状态:</div>
              <div className="info-item-content">处理中</div>
            </li>
            <li className="info-item">
              <div className="info-item-title">交易备注:</div>
              <div className="info-item-content">fpNU5</div>
            </li>
          </ul>
          <p className="text-center ft-15 mt-5">
            如需要帮助请<span className="text-blue">联系客服</span>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default withdrawRecordDetail
