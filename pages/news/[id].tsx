import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { NewsDetail } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const newsDetail: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDateTime } = useTransfer()
  const [news, setNews] = useState<NewsDetail>(null)
  const router = useRouter()
  const id = useMemo(() => +router.query?.id, [router.query])

  const fetchNews = async () => {
    loadingStart()
    try {
      const res = await API.getNewsDetail(id)
      setNews(res.data)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchNews()
  }, [id])
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      {news && (
        <div className="main-content section-padding">
          <div className="message-title w-100 my-3">{news?.title}</div>
          <div className="message-time w-100">
            {toDateTime(news?.updated_at)}
          </div>
          <Box className="message-content-col w-100 mt-4" whiteSpace="pre-wrap">
            {news?.content}
          </Box>
        </div>
      )}

      <FooterNavBar />
    </Layout>
  )
}

export default newsDetail
