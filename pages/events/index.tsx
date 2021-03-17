import ColumnTitle from '@/components/ColumnTitle'
import CountDownReloadBtn from '@/components/CountDownReloadBtn'
import EventItem from '@/components/EventItem'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import NoticeBar from '@/components/NoticeBar'
import Paginator from '@/components/Paginator'
import LeagueFilterPopup from '@/components/popups/LeagueFilterPopup'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { usePaginationContext } from '@/context/PaginationProvider'
import { afterDateRangeOpts } from '@/lib/options'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import React, { useEffect, useMemo, useState } from 'react'

const eventList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState('today')
  const { fetchMarquee, fetchHandicaps, marquee, handicaps } = useService()
  const { toDateRange } = useTransfer()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const { page } = usePaginationContext()
  useEffect(() => {
    fetchMarquee()
  }, [])

  const handleEventsReload = async () => {
    setIsLoading(true)
    await fetchHandicaps({
      start_at,
      end_at,
      page,
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchHandicaps({
      start_at,
      end_at,
      page,
    })
  }, [currentTab, page])

  return (
    <Layout>
      <HeaderTitleBar title="市场列表" />
      <div className="main-content">
        {/* 公告 */}
        <NoticeBar msgs={marquee} />
        {/* 热门赛事 */}
        <div className="section-title-bar d-flex justify-content-between section-padding">
          <ColumnTitle>赛事列表</ColumnTitle>
          <div className="d-flex group-btn">
            {/* <LeagueFilterBtn /> */}
            <CountDownReloadBtn
              onClick={handleEventsReload}
              isLoading={isLoading}
            />
          </div>
        </div>
        {/* 日期页籤 */}
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
        <div className="pt-2 section-padding">
          <div className="list-container">
            {handicaps.map((t, i) => (
              <EventItem key={i} event={t} />
            ))}
          </div>
          <Paginator />
        </div>
      </div>
      <LeagueFilterPopup />

      <FooterNavBar />
    </Layout>
  )
}

export default eventList
