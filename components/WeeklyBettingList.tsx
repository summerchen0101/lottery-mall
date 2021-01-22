import Link from 'next/link'
import React from 'react'

const WeeklyBettingList: React.FC = () => {
  return (
    <div className="list-container">
      <div className="accordion-item">
        <div className="accordion-title section-padding">
          本週(2)
          {/* <i className="iconfont iconallow-down" /> */}
        </div>
        <div className="accordion-content table-responsive">
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
      </div>
    </div>
  )
}

export default WeeklyBettingList
