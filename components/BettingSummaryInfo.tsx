import useTransfer from '@/utils/useTransfer'
import React from 'react'

const BettingSummaryInfo: React.FC<{
  date?: string
  sum: number
  expect: number
}> = ({ date, sum, expect }) => {
  const { toCurrency } = useTransfer()
  return (
    <div className="pintop-section d-flex flex-column justify-content-center fixed">
      <ul className="acc-inner mt-1">
        <li className="acc-item px-2">
          <p>{date}</p>
        </li>
        <li className="divider" />
        <li className="acc-item px-2">
          <p>{toCurrency(sum, 2)}</p>
          <span className="text-lighgray">金額統計</span>
        </li>
        <li className="divider" />
        <li className="acc-item px-2">
          <p className="text-green">{toCurrency(expect, 2)}</p>
          <span className="text-lighgray">输赢结果</span>
        </li>
      </ul>
    </div>
  )
}

export default BettingSummaryInfo
