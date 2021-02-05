import Link from 'next/link'
import React from 'react'
import DateTabGroup from '@/components/DateTabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'

const HistoryPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="帐务历史" />
      <>
        <div className="main-content">
          <DateTabGroup />
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>日期</th>
                <th>笔数</th>
                <th>下注金额</th>
                <th>总收益</th>
                <th>明细</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(7)].map((_, i) => (
                <tr key={i}>
                  <td>2020-09-30</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>
                    <Link href="/history/1">
                      <img src="images/ic_history.svg" />
                    </Link>
                  </td>
                </tr>
              ))}
              <tr>
                <td>合計</td>
                <td>10</td>
                <td>530</td>
                <td className="text-green">7.65</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pinbottom-section">
          <ul className="acc-inner mt-1">
            <li className="acc-item px-5">
              <p>400.00</p>
              <span className="text-lighgray">累计流水</span>
            </li>
            <li className="divider" />
            <li className="acc-item px-5">
              <p className="text-green">76.00</p>
              <span className="text-lighgray">总收益</span>
            </li>
          </ul>
        </div>
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default HistoryPage
