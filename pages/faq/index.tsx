import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { Faq } from '@/lib/types'
import useCheckList from '@/utils/useCheckList'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'

const faq: React.FC = () => {
  const router = useRouter()

  // const {} = useCheckList()
  const { loadingStart, loadingEnd } = useLoaderProvider()

  const API = useRequest()
  const [faqs, setFaqs] = useState<Faq[]>([])
  const faqsByCategory = useMemo(
    () => _.groupBy(faqs, (t) => t.catalogue.name),
    [faqs],
  )
  const fetchFaqs = async () => {
    loadingStart()
    try {
      const res = await API.getFaqList()
      setFaqs(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchFaqs()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="帮助中心" />
      <div className="main-content">
        {Object.entries(faqsByCategory).map(([category, faqs], g_i) => (
          <ul key={g_i} className="list-group help_inner">
            <li className="title">
              <i className="iconfont iconquest" />
              {category}
            </li>
            <li>
              <ul className="list-group col-list section-padding ">
                {faqs.map((t, i) => (
                  <li
                    key={i}
                    className="col-list-item border-bottom pointer"
                    onClick={() => router.push(`/faq/${t.id}`)}
                  >
                    {t.title}
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
