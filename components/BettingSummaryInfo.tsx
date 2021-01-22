import React from 'react'
import cs from 'classnames'
const BettingSummaryInfo: React.FC<{ date?: string }> = ({ date }) => {
  return (
    <div className="pintop-section d-flex flex-column justify-content-center fixed">
      <ul className="acc-inner mt-1">
        {date && (
          <>
            <li className="acc-item px-2">
              <p>2020-08-26</p>
            </li>
            <li className="divider" />
          </>
        )}
        <li className={cs('acc-item', date ? 'px-2' : 'px-5')}>
          <p>400.00</p>
          <span className="text-lighgray">金額統計</span>
        </li>
        <li className="divider" />
        <li className={cs('acc-item', date ? 'px-2' : 'px-5')}>
          <p className="text-green">76.00</p>
          <span className="text-lighgray">預估獲利</span>
        </li>
      </ul>
    </div>
  )
}

export default BettingSummaryInfo
