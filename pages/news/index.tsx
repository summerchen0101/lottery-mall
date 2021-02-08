import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import { News } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import EmptyHolder from '@/components/EmptyHolder'

const news: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const [isLoaded, setIsLoaded] = useState(false)
  const API = useRequest()
  const { toDate } = useTransfer()
  const [news, setNews] = useState<News[]>([])
  const newsGroups = useMemo(() => _.groupBy(news, 'news_type'), [news])
  const fetchNews = async () => {
    loadingStart()
    setIsLoaded(false)
    try {
      const res = await API.getNewsList()
      setNews(res.data.list)
    } catch (err) {}
    loadingEnd()
    setIsLoaded(true)
  }
  useEffect(() => {
    fetchNews()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <div className="main-content">
        <TabGroup justifyContent="space-between">
          {newsTypeOpts.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={current === t.value}
              onClick={() => setCurrent(t.value)}
            />
          ))}
        </TabGroup>

        {/* Tab panes */}
        <div className="tab-content section-padding">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <ul className="list-container list-group">
              {!newsGroups[current] && isLoaded && <EmptyHolder />}
              {newsGroups[current]?.map((t, i) => (
                <li
                  key={i}
                  className="message-item"
                  onClick={() => router.push(`/news/${t.id}`)}
                >
                  <div className="message-container d-flex flex-column">
                    <div className="title-col">
                      <div className="message-title">{t.title}</div>
                      <div className="message-time text-right">
                        {toDate(t.updated_at)}
                      </div>
                    </div>
                    <div className="message-content-col">{t.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default news
