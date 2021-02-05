import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const invite: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="关于AG" />
      <div className="main-content">
        <div className="about-section section-padding">
          <div className="w-100 text-center py-3 mt-5">
            <img src="images/about_ag.png" width="90%" height="auto" />
          </div>
          <div className="w-100 mt-2">
            <span className="text-blue">AG</span>
            是目前英国总公司，首次在亚洲区设置的运动投资型公司，分为一般市场上的运动投资基金，都是由专业经理人去掌控您的损利，或者由会员本身去操作您
            本公司主要经营项目以足球为主，以及国际赛事协会与英国知名度的合法交易所公司合作，经历多年的研发，概念革命性地颠覆了传统运动市场，集合了机率和统计学概论
            ，让足球项目不单单只是博弈，也可以是一种投资工具，进行比股票与基金更稳健的操作模式。
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default invite
