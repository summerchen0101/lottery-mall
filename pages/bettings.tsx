import React from 'react'
import BettingItem from '../components/BettingItem'
import BettingSummaryInfo from '../components/BettingSummaryInfo'
import FooterNavBar from '../components/FooterNavBar'
import HeaderTitleBar from '../components/HeaderTitleBar'
import Layout from '../components/Layout'
import UserBalance from '../components/UserBalance'

const BettingsPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar title="交易明細" extra={<UserBalance />} />
      <div className="pintop-section d-flex flex-column justify-content-center fixed">
        <ul className="acc-inner mt-1">
          <li className="acc-item px-5">
            <p>400.00</p>
            <span className="text-lighgray">金額統計</span>
          </li>
          <li className="divider" />
          <li className="acc-item px-5">
            <p className="text-green">76.00</p>
            <span className="text-lighgray">預估獲利</span>
          </li>
        </ul>
      </div>
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
