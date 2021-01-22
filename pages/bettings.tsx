import React from 'react'
import BettingItem from '../components/BettingItem'
import BettingSummaryInfo from '../components/BettingSummaryInfo'
import FooterNavBar from '../components/FooterNavBar'
import HeaderTitleBar from '../components/HeaderTitleBar'
import Layout from '../components/Layout'

const BettingsPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar
        title="交易明細"
        extra={<span className="user-wallet">¥ 20,849.55</span>}
      />
      <BettingSummaryInfo />
      <div className="main-content background-gray" style={{ paddingTop: 105 }}>
        <div className="list-container">
          {[...Array(8)].map((_, i) => (
            <BettingItem key={i} />
          ))}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default BettingsPage
