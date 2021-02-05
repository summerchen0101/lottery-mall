import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TradeRankPopup from '@/components/popups/TradeRankPopup'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import React, { useState } from 'react'

const tabs = [
  { label: '全場反波膽', value: 'tab1' },
  { label: '半場反波膽', value: 'tab2' },
]
const MarketPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('tab1')
  return (
    <Layout>
      <HeaderTitleBar title="賽事詳情" />

      <div className="main-content">
        {/* 賽事資訊 */}
        <div className="teaminfo-section background-red">
          <a className="left-item">
            <i className="iconfont iconallow-left" />
          </a>
          <div className="league-col">瑞典北部甲组联赛</div>
          <div className="time-col">2020-09-02 14:00</div>
          <div className="team-col">
            <div className="t1">富山胜利(主)</div>
            <div className="icon_vs">VS</div>
            <div className="t2">熊本深红</div>
          </div>
          <div className="score-col">22:19</div>
        </div>
        {/* 日期頁籤 */}
        <div className="main-section section-padding">
          <TabGroup justifyContent="center">
            {tabs.map((t, i) => (
              <Tab
                key={i}
                label={t.label}
                active={currentTab === t.value}
                onClick={() => setCurrentTab(t.value)}
              />
            ))}
          </TabGroup>

          <div className="section-title-bar d-flex justify-content-between align-items-center">
            <div className="vol-col">
              成交量：<span className="text-blue">42,823,114</span>
            </div>
            <div className="d-flex">
              <button className="title-bar-btn icon_btn">
                <i
                  className="iconfont iconbillboard"
                  data-toggle="modal"
                  data-target="#chartsModal"
                />
              </button>
              <CountDownReloadBtn />
            </div>
          </div>
          {/* Tab panes */}
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              {/* 暫無數據 */}
              {/* <div class="data_null"><img src="images/data_null.svg">
                  <p>暂无数据</p>
              </div> */}
              {/* 表頭 */}
              <div className="tricks-item-thead d-flex">
                <div className="tricks-item-title">比分</div>
                <div className="tricks-item-title">获利</div>
                <div className="tricks-item-title">可交易</div>
              </div>
              <div className="list-container">
                {Array(10)
                  .fill('')
                  .map((t, i) => (
                    <div
                      key={i}
                      className="tricks-item"
                      data-toggle="modal"
                      data-target="#betlistModal"
                    >
                      <div className="score">0-{i}</div>
                      <div className="profit text-red">5.41%</div>
                      <div className="price">￥ 500000</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="tab-pane" id="tabs-2" role="tabpanel">
              {/* 暫無數據 */}
              <div className="data_null">
                <img src="images/data_null.svg" />
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TradeRankPopup />
      <FooterNavBar />
    </Layout>
  )
}

export default MarketPage
