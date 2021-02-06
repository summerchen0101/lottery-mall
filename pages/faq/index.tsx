import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { Faq } from '@/lib/types'
import useCheckList from '@/utils/useCheckList'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

const faq: React.FC = () => {
  const router = useRouter()

  // const {} = useCheckList()

  const API = useRequest()
  const [faqs, setFaqs] = useState<Faq[]>([])
  const fetchFaqs = async () => {
    try {
      const res = await API.getFaqList()
      setFaqs(res.data.list)
    } catch (err) {}
  }
  useEffect(() => {
    fetchFaqs()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="帮助中心" />
      <div className="main-content">
        {faqs.map((g, g_i) => (
          <ul key={g_i} className="list-group help_inner">
            <li className="title">
              <i className="iconfont iconquest" />
              存款教程
            </li>
            <li>
              <ul className="list-group col-list section-padding ">
                {Array(3)
                  .fill('')
                  .map((t, i) => (
                    <li
                      key={i}
                      className="col-list-item border-bottom pointer"
                      onClick={() => router.push(`/faq/${i + 1}`)}
                    >
                      如何公司入款
                      <i className="iconfont iconallow-right" />
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default faq
