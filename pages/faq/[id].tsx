import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { Faq } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const faqDetail: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDateTime } = useTransfer()
  const [faq, setFaq] = useState<Faq>(null)
  const router = useRouter()
  const id = useMemo(() => +router.query?.id, [router.query])

  const fetchFaq = async () => {
    loadingStart()
    try {
      const res = await API.getFaqList()
      // const res = await API.getFaqDetail(id)
      setFaq(res.data.list.find((t) => t.id === id))
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchFaq()
  }, [id])
  return (
    <Layout>
      <HeaderTitleBar back title="帮助中心" />
      <div className="main-content section-padding">
        <div className="message-title w-100 my-3">{faq?.title}</div>
        <div className="message-content-col w-100 mt-4">
          {faq?.content_mobile}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default faqDetail
