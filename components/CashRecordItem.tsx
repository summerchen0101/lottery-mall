import React from 'react'

const CashRecordItem: React.FC = () => {
  return (
    <div
      className="recharge-record background-white"
      // onClick="location.href = 'withdrawal-record-info.html'"
    >
      <div className="info-col">
        <div className="d-flex align-items-center">
          <div className="record-title">提现</div>
          <div className="time ml-2">2020-06-30 11:19</div>
        </div>
        <div className="status">待处理</div>
      </div>
      <div>中国邮政(1223)</div>
      <div>充值金额:100</div>
      <div className="order-num">订单号:20160130123145675434</div>
    </div>
  )
}

export default CashRecordItem
