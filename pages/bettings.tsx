import BettingItem from '@/components/BettingItem'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import React from 'react'

const BettingsPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar title="當日交易明細" />
      <div className="pintop-section d-flex flex-column justify-content-center fixed">
        <ul className="acc-inner mt-1">
          <li className="acc-item px-2">
            <p>5</p>
            <span className="text-lighgray">筆數</span>
          </li>
          <li className="divider" />
          <li className="acc-item px-2">
            <p>1800.00</p>
            <span className="text-lighgray">金額統計</span>
          </li>
          <li className="divider" />
          <li className="acc-item px-2">
            <p className="text-green">276.00</p>
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
