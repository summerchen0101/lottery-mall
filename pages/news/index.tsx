import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { News } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

const tabs = [
  { label: '系統通知', value: 1 },
  { label: '賽事資訊', value: 2 },
  { label: '優惠活動', value: 3 },
]
const news: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDateTime } = useTransfer()
  const [news, setNews] = useState<News[]>([])
  const fetchNews = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getNewsList()
      setNews(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchNews()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <div className="main-content">
        {/* <TabGroup justifyContent="space-between">
          {tabs.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={current === t.value}
              onClick={() => setCurrent(t.value)}
            />
          ))}
        </TabGroup> */}

        {/* Tab panes */}
        <div className="tab-content section-padding">
          {/* 暫無數據 */}
          {/* <div class="data_null"><img src="images/data_null.svg"><p>暂无数据</p></div> */}
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <ul className="list-container list-group">
              {news.map((t, i) => (
                <li
                  key={i}
                  className="message-item"
                  onClick={() => router.push(`/news/${t.id}`)}
                >
                  <div className="message-container d-flex flex-column">
                    <div className="title-col">
                      <div className="message-title">{t.title}</div>
                      <div className="message-time text-right">
                        {toDateTime(t.updated_at)}
                      </div>
                    </div>
                    <div className="message-content-col">...</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="tab-pane" id="tabs-2" role="tabpanel">
            <div className="data_null">
              <img src="images/data_null.svg" />
              <p>暂无数据</p>
            </div>
          </div> */}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default news
