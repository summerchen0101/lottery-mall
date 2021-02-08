import ColumnTitle from '@/components/ColumnTitle'
import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import EventItem from '@/components/EventItem'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import LeagueFilterBtn from '@/components/LeagueFilterBtn'
import NoticeBar from '@/components/NoticeBar'
import LeagueFilterPopup from '@/components/popups/LeagueFilterPopup'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import React, { useEffect, useState } from 'react'
import { afterDateRangeOpts } from '@/lib/options'
import { useRouter } from 'next/dist/client/router'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'

const eventList: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(1)
  const router = useRouter()
  const { fetchMarquee, fetchHandicaps, marquee, handicaps } = useService()
  const { user } = useGlobalProvider()

  useEffect(() => {
    Promise.all([fetchMarquee(), fetchHandicaps()])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <Layout>
      <HeaderTitleBar title="市场列表" />
      <div className="main-content">
        {/* 公告 */}
        <NoticeBar msgs={marquee} />
        {/* 熱門賽事 */}
        <div className="section-title-bar d-flex justify-content-between section-padding">
          <ColumnTitle>赛事列表</ColumnTitle>
          {/* <div className="d-flex group-btn">
            <LeagueFilterBtn />
            <CountDownReloadBtn />
          </div> */}
        </div>
        {/* 日期頁籤 */}
        <TabGroup justifyContent="space-between">
          {afterDateRangeOpts.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={currentTab === t.value}
              onClick={() => setCurrentTab(t.value)}
            />
          ))}
        </TabGroup>
        {/* Tab panes */}
        <div className="tab-content pt-2 section-padding">
          <div className="tab-pane active">
            {/* 暫無數據 */}
            {/* <div class="data_null"><img src="images/data_null.svg">
                              <p>暂无数据</p>
                          </div> */}
            <div className="list-container">
              {handicaps.map((t, i) => (
                <EventItem key={i} event={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <LeagueFilterPopup />

      <FooterNavBar />
    </Layout>
  )
}

export default eventList
