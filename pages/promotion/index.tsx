import { useRouter } from 'next/dist/client/router'
import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'

const PromotionPage: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar title="优惠活动" />
      <div className="main-content section-padding">
        <div className="list-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="promotion-item"
              onClick={() => router.push('/promotion/1')}
            >
              <div className="promotion-img">
                <img src="/images/banner/banner-1.jpg" className="img-fluid" />
              </div>
              <div className="promotion-content">
                <div className="ft-16 promotion-title mb-1">注册送体验金</div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="ft-13 text-lighgray">
                    2020-12-05 至 2020-12-12
                  </span>
                  <button className="mini_btn color-blue">查看详情</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default PromotionPage
