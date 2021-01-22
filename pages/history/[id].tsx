import React from 'react'
import BettingItem from '../../components/BettingItem'
import BettingSummaryInfo from '../../components/BettingSummaryInfo'
import FooterNavBar from '../../components/FooterNavBar'
import HeaderTitleBar from '../../components/HeaderTitleBar'
import Layout from '../../components/Layout'

const HistoryDetailPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar
        title="账务明细"
        extra={<span className="user-wallet">¥ 20,849.55</span>}
      />
      <BettingSummaryInfo date="2020-08-26" />
      <div className="main-content background-gray" style={{ paddingTop: 105 }}>
        <div className="list-container">
          {[...Array(5)].map((_, i) => (
            <BettingItem key={i} />
          ))}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryDetailPage
