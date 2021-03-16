import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { Message } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const messageDetail: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [message, setMessage] = useState<Message>(null)
  const router = useRouter()
  const id = useMemo(() => +router.query?.id, [router.query])

  const fetchMessage = async () => {
    loadingStart()
    try {
      const res = await API.getMessageDetail(id)
      setMessage(res.data)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchMessage()
  }, [id])
  return (
    <Layout>
      <HeaderTitleBar back title="站内信" />
      {message && (
        <div className="main-content section-padding">
          <div className="message-title w-100 my-3">{message.title}</div>
          <div className="message-time w-100">{toDate(message.created_at)}</div>
          <Box className="message-content-col w-100 mt-3" whiteSpace="pre-wrap">
            {message.content}
          </Box>
        </div>
      )}

      <FooterNavBar />
    </Layout>
  )
}

export default messageDetail
