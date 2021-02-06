import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { NewsDetail } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import React, { useEffect, useState } from 'react'

const newsDetail: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDateTime } = useTransfer()
  const [news, setNews] = useState<NewsDetail>(null)
  const fetchNews = async () => {
    loadingStart()
    try {
      const res = await API.getNewsDetail(1)
      setNews(res.data)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchNews()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <div className="main-content section-padding">
        <div className="message-title w-100 my-3">{news.title}</div>
        <div className="message-time w-100">{toDateTime(news.updated_at)}</div>
        <div className="message-content-col w-100 mt-4">{news.content}</div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default newsDetail
