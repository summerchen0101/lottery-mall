import { useRouter } from 'next/dist/client/router'
import React from 'react'

const HomeEventItem = () => {
  const router = useRouter()
  return (
    <div className="team-item" onClick={() => router.push('/event')}>
      <div className="info-col">
        <div className="time">
          <i className="iconfont iconcalendar"></i>2021-02-03 07:20
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
