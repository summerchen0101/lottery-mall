import React from 'react'

const BettingDetail: React.FC = () => {
  return (
    <div className="detail-content">
      <ul className="title-inner">
        <li className="title-item">单号</li>
        <li className="title-item">开赛时间</li>
        <li className="title-item">交易时间</li>
        <li className="title-item">联盟</li>
        <li className="title-item">队伍</li>
        <li className="title-item">比分</li>
        <li className="title-item">金额</li>
        <li className="title-item">赔率</li>
        <li className="title-item">预估获利</li>
      </ul>
      <ul className="content-inner">
        <li className="content-item">
          ASCCBB1365
          <button className="icon_btn">
            <i className="iconcopy iconfont" />
          </button>
          {/* <button
            className="mini_btn color-red"
            data-toggle="modal"
            data-target="#revokeModal"
          >
            撤单
          </button> */}
        </li>
        <li className="content-item">2020-08-26 14:21:18</li>
        <li className="content-item">2020-08-26 12:20:10</li>
        <li className="content-item">瑞典北部甲组联赛</li>
        <li className="content-item">富山胜利(主)VS熊本深红</li>
        <li className="content-item">
          <span className="text-red">反对</span>全场坡胆 0-2
        </li>
        <li className="content-item">100.00</li>
        <li className="content-item">2.7%</li>
        <li className="content-item">
          <span className="text-green">2.56</span>
          <span className="text-yellow ml-3">已扣除手续费5%</span>
        </li>
      </ul>
    </div>
  )
}

export default BettingDetail
