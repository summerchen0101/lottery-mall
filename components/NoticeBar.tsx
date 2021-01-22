import React from 'react'
import Marquee from './Marquee'

const NoticeBar = () => {
  return (
    <div className="notice-section d-flex align-items-center">
      <i className="iconfont iconnotification" />
      <Marquee>
        系统维护公告!将于11月4日 17:00系统更新，为了维护您的权益...
      </Marquee>
    </div>
  )
}

export default NoticeBar
