import React from 'react'
import FooterNavBar from '../../components/FooterNavBar'
import HeaderTitleBar from '../../components/HeaderTitleBar'
import Layout from '../../components/Layout'
import WeeklyBettingList from '../../components/WeeklyBettingList'

const HistoryPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar
        title="帐务历史"
        extra={<span className="user-wallet">¥ 20,849.55</span>}
      />
      <>
        <div className="main-content">
          <ul
            className="nav nav-tabs d-flex justify-content-between section-padding"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#tabs-1"
                role="tab"
              >
                本週
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#tabs-2"
                role="tab"
              >
                本月
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#tabs-3"
                role="tab"
              >
                上个月
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#tabs-4"
                role="tab"
              >
                一年
              </a>
            </li>
          </ul>
          {/* Tab panes */}
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <WeeklyBettingList />
            </div>
            <div className="tab-pane" id="tabs-2" role="tabpanel">
              <WeeklyBettingList />
              <WeeklyBettingList />
            </div>
            <div className="tab-pane" id="tabs-3" role="tabpanel">
              {/* 暫無數據 */}
              <div className="data_null">
                <img src="images/data_null.svg" />
                <p>暂无数据</p>
              </div>
            </div>
            <div className="tab-pane" id="tabs-4" role="tabpanel">
              {/* 暫無數據 */}
              <div className="data_null">
                <img src="images/data_null.svg" />
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pinbottom-section">
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
        </div>
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryPage
