import CarouselBanner from '@/components/CarouselBanner'
import CarouselSlide from '@/components/CarouselSlide'
import ColumnTitle from '@/components/ColumnTitle'
import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import HomeEventItem from '@/components/HomeEventItem'
import Layout from '@/components/Layout'
import MessageBadge from '@/components/MessageBadge'
import NoticeBar from '@/components/NoticeBar'
import useService from '@/utils/useService'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  const router = useRouter()
  const { fetchMarquee, fetchBanners, marquee, banners } = useService()

  useEffect(() => {
    Promise.all([fetchMarquee(), fetchBanners()])
  }, [])
  return (
    <Layout>
      <HeaderTitleBar
        title={<img className="logo" src="/images/logo.png" />}
        extra={<MessageBadge />}
      />
      <div className="main-content">
        {/* 輪撥BANNER */}
        <CarouselBanner>
          {banners.map((t, i) => (
            <CarouselSlide
              key={i}
              image={t.img_mobile}
              onClick={() => router.push(t.url)}
            />
          ))}
        </CarouselBanner>
        {/* 公告 */}
        <NoticeBar msgs={marquee} />
        <div className="middle-menu-section">
          <div className="user-info d-flex justify-content-between">
            <div className="user-id">bet8888</div>
            <div>
              账户余额<span className="user-wallet">¥ 20,849.55</span>
            </div>
          </div>
          <ul className="menu-list">
            <li
              className="menu-list-item ic_recharge"
              onClick={() => router.push('/deposit')}
            >
              <img src="/images/ic_recharge.svg" />
              充值
            </li>
            <li className="divider" />
            <li
              className="menu-list-item ic_withdrawal"
              onClick={() => router.push('/withdraw')}
            >
              <img src="/images/ic_withdrawal.svg" />
              提领
            </li>
            <li className="divider" />
            <li
              className="menu-list-item ic_promotion"
              onClick={() => router.push('/promotion')}
            >
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
              {/* <LeagueFilterBtn /> */}
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

      <FooterNavBar />
    </Layout>
  )
}

export default Home
