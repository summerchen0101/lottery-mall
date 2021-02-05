import React from 'react'
import CarouselBanner from '@/components/CarouselBanner'
import CarouselSlide from '@/components/CarouselSlide'
import ColumnTitle from '@/components/ColumnTitle'
import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import HomeEventItem from '@/components/HomeEventItem'
import Layout from '@/components/Layout'
import LeagueFilterBtn from '@/components/LeagueFilterBtn'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import NoticeBar from '@/components/NoticeBar'
import FooterNavBar from '@/components/FooterNavBar'

const Home: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar
        title={<img className="logo" src="/images/logo.png" />}
        extra={
          <>
            <i className="iconfont iconmail" />
            <span className="red-dot" />
          </>
        }
      />
      <div className="main-content">
        {/* 輪撥BANNER */}
        <CarouselBanner>
          <CarouselSlide image="/images/banner/banner-1.jpg" />
          <CarouselSlide image="/images/banner/banner-2.jpg" />
        </CarouselBanner>
        {/* 公告 */}
        <NoticeBar />
        <div className="middle-menu-section">
          <div className="user-info d-flex justify-content-between">
            <div className="user-id">bet8888</div>
            <div>
              账户余额<span className="user-wallet">¥ 20,849.55</span>
            </div>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item ic_recharge">
              <img src="/images/ic_recharge.svg" />
              充值
            </li>
            <li className="divider" />
            <li className="menu-list-item ic_withdrawal">
              <img src="/images/ic_withdrawal.svg" />
              提领
            </li>
            <li className="divider" />
            <li className="menu-list-item ic_promotion">
              <img src="/images/ic_promotion.svg" />
              优惠
            </li>
            <li className="divider" />
            <li className="menu-list-item ic_score">
              <img src="/images/ic_score.svg" />
              比分
            </li>
          </ul>
        </div>
        {/* 熱門賽事 */}
        <div className="main-section section-padding">
          <div className="section-title-bar d-flex justify-content-between align-items-center">
            <ColumnTitle>热门赛事</ColumnTitle>
            <div className="d-flex group-btn">
              <LeagueFilterBtn />
              <CountDownReloadBtn />
            </div>
          </div>
          <div className="list-container">
            {[...Array(5)].map((_, i) => (
              <HomeEventItem key={i} />
            ))}
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
                    热门排序
                    <input type="radio" name="sort" value="pupular" />
                    <label></label>
                  </div>
                  <div>
                    <input type="radio" name="sort" value="time" />
                    <label>时间排序</label>
                  </div>
                  <div>
                    <input type="checkbox" id="checkall" value="all" />
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
                className="btnbase primary_btn"
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

export default Home
