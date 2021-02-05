import React from 'react'

const HomeEventItem = () => {
  return (
    <div className="team-item">
      <div className="info-col">
        <div className="time text-red">
          <i className="iconfont iconclock" />
          00时22分19秒
        </div>
        <div className="team-col">富山胜利(主)VS熊本深红</div>
        <div className="league-col">瑞典北部甲组联赛</div>
      </div>
      <div className="chart-col">
        <div className="count text-blue">800M</div>
        <span>總搶購量</span>
      </div>
    </div>
  )
}

export default HomeEventItem
