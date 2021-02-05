import React from 'react'
import ColumnTitle from '@/components/ColumnTitle'
import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import LeagueFilterBtn from '@/components/LeagueFilterBtn'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import NoticeBar from '@/components/NoticeBar'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import UserBalance from '@/components/UserBalance'

const MarketPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar title="市场列表" extra={<UserBalance />} />
      <div className="main-content">
        {/* 公告 */}
        <NoticeBar />
        {/* 熱門賽事 */}
        <div className="section-title-bar d-flex justify-content-between section-padding">
          <ColumnTitle>赛事列表</ColumnTitle>
          <div className="d-flex group-btn">
            <LeagueFilterBtn />
            <CountDownReloadBtn />
          </div>
        </div>
        {/* 日期頁籤 */}
        <TabGroup>
          <Tab label="全部(100)" active />
          <Tab label="今日(40)" />
          <Tab label="本週(40)" />
        </TabGroup>
        {/* Tab panes */}
        <div className="tab-content pt-2 section-padding">
          <div className="tab-pane active">
            {/* 暫無數據 */}
            {/* <div class="data_null"><img src="images/data_null.svg">
                              <p>暂无数据</p>
                          </div> */}
            <div className="list-container">
              {[...Array(5)].map((_, i) => (
                <EventItem key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 彈窗 */}
      <div
        className="modal fade"
        id="leagueModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button className="icon_btn">
                <i className="iconfont iconreload" />
              </button>
              <h5 className="modal-titlemodal-header" id="myModalLabel">
                联盟筛选
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="main-sort-col">
                  <div>
                    <input type="radio" name="sort" defaultValue="pupular" />
                    <label>热门排序</label>
                  </div>
                  <div>
                    <input type="radio" name="sort" defaultValue="time" />
                    <label>时间排序</label>
                  </div>
                  <div>
                    <input type="checkbox" id="checkall" defaultValue="all" />
                    <label>全选</label>
                  </div>
                </div>
                <div className="league-filter">
                  <ul className="check-list">
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>葡超(10)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>波超(30)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>瑞典超(51)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>英冠(25)</label>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
              <button type="button" className="btnbase outline_btn color-blue">
                关闭视窗
              </button>
              <button
                type="button"
                className="btnbase primary_btn "
                data-dismiss="modal"
              >
                确认搜寻
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 彈窗 */}
      <div
        className="modal fade"
        id="leagueModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button className="icon_btn">
                <i className="iconfont iconreload" />
              </button>
              <h5 className="modal-titlemodal-header" id="myModalLabel">
                联盟筛选
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="main-sort-col">
                  <div>
                    <input type="radio" name="sort" defaultValue="pupular" />
                    <label>热门排序</label>
                  </div>
                  <div>
                    <input type="radio" name="sort" defaultValue="time" />
                    <label>时间排序</label>
                  </div>
                  <div>
                    <input type="checkbox" id="checkall" defaultValue="all" />
                    <label>全选</label>
                  </div>
                </div>
                <div className="league-filter">
                  <ul className="check-list">
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>葡超(10)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>波超(30)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>瑞典超(51)</label>
                    </li>
                    <li className="check-item w-50">
                      <input type="checkbox" name="Checkbox[]" />
                      <label>英冠(25)</label>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
              <button type="button" className="btnbase outline_btn color-blue">
                关闭视窗
              </button>
              <button
                type="button"
                className="btnbase primary_btn "
                data-dismiss="modal"
              >
                确认搜寻
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterNavBar />
    </Layout>
  )
}

export default MarketPage
