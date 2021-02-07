import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { Message } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

const message: React.FC = () => {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [messages, setMessages] = useState<Message[]>([])
  const fetchMessages = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getMessageList()
      setMessages(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchMessages()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="站内信" />
      <div className="main-content">
        <Box as="ul" className="list-container list-group" mx="2">
          {messages.map((t, i) => (
            <li
              key={i}
              className="message-item"
              onClick={() => router.push(`/message/${i + 1}`)}
            >
              <label className="form-checkbox message-select">
                <input
                  className="input-check"
                  type="checkbox"
                  name="Checkbox"
                />
                <span className="checkmark" />
              </label>
              {/* <input type="checkbox" class="message-select"> */}
              <i className="iconfont iconmail" />
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
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default message
