import { useRouter } from 'next/dist/client/router'
import React from 'react'

const EventItem = () => {
  const router = useRouter()
  return (
    <div className="team-item" onClick={() => router.push('/event')}>
      <div className="info-col ">
        <div className="d-flex justify-content-between align-items-center bdb pb">
          {/* <div className="time text-red">
            <i className="iconfont iconclock" />
            00时22分19秒
          </div> */}
          <div className="time">
            <i className="iconfont iconcalendar"></i>2021-02-04 12:22
          </div>
          <div className="tricks-num">99+</div>
        </div>
        <div className="team-col">富山胜利(主)VS熊本深红</div>
        <div className="league-col">瑞典北部甲组联赛</div>
      </div>
    </div>
  )
}

export default EventItem
