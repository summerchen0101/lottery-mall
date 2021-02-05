import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const faq: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="帮助中心" />
      <div className="main-content">
        {Array(3)
          .fill('')
          .map((g, g_i) => (
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
