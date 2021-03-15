import CarouselBanner from '@/components/CarouselBanner'
import ColumnTitle from '@/components/ColumnTitle'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import HomeEventItem from '@/components/HomeEventItem'
import Layout from '@/components/Layout'
import MessageBadge from '@/components/MessageBadge'
import NoticeBar from '@/components/NoticeBar'
import UserBalance from '@/components/UserBalance'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { Handicap } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

const Home: React.FC = () => {
  const [handicaps, setHandicaps] = useState<Handicap[]>([])
  const router = useRouter()
  const {
    fetchMarquee,
    fetchBanners,
    fetchUserInfo,
    marquee,
    banners,
  } = useService()
  const API = useRequest()
  const { user } = useGlobalProvider()

  const fetchHotHandicaps = async () => {
    try {
      const res = await API.getHotHandicaps()
      setHandicaps(res.data.list)
    } catch (err) {}
  }

  useEffect(() => {
    Promise.all([
      fetchMarquee(),
      fetchBanners(),
      fetchUserInfo(),
      fetchHotHandicaps(),
    ])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <Layout>
      <HeaderTitleBar
        title={<img className="logo" src="/images/logo.png" />}
        extra={<MessageBadge />}
      />
      <div className="main-content">
        {/* 轮拨BANNER */}
        <CarouselBanner banners={banners} />
        {/* 公告 */}
        <NoticeBar msgs={marquee} />
        <div className="middle-menu-section">
          <div className="user-info d-flex justify-content-between">
            <div className="user-id">欢迎您 {user?.acc}</div>
            <div>
              账户余额 <UserBalance />
            </div>
          </div>
          <ul className="menu-list">
            <li
              className="menu-list-item "
              onClick={() => router.push('/deposit')}
            >
              <img src="/images/ic_recharge.svg" />
              充值
            </li>
            <li className="divider" />
            <li className="menu-list-item" onClick={() => router.push('/news')}>
              <img src="/images/ic_notice.svg" alt="" />
              公告
            </li>
            <li className="divider" />
            <li
              className="menu-list-item i"
              onClick={() => router.push('/promotion')}
            >
              <img src="/images/ic_promotion.svg" />
              优惠
            </li>
            <li className="divider" />
            <li
              className="menu-list-item"
              onClick={() => window.open('https://live.leisu.com/', '_blank')}
            >
              <img src="/images/ic_score.svg" />
              比分
            </li>
          </ul>
        </div>
        {/* 热门赛事 */}
        <div className="main-section section-padding">
          <div className="section-title-bar d-flex justify-content-between align-items-center">
            <ColumnTitle>热门赛事</ColumnTitle>
            <div className="d-flex group-btn">
              {/* <LeagueFilterBtn /> */}
              {/* <CountDownReloadBtn /> */}
            </div>
          </div>
          <div className="list-container">
            {handicaps.map((event, i) => (
              <HomeEventItem key={i} event={event} />
            ))}
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default Home
