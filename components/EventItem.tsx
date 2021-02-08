import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'

function EventItem({ event }: { event: Handicap }) {
  const router = useRouter()
  const { toDateTime } = useTransfer()
  return (
    <div
      className="team-item"
      onClick={() => router.push(`/event/${event.id}`)}
    >
      <div className="info-col ">
        <div className="d-flex justify-content-between align-items-center bdb pb">
          {/* <div className="time text-red">
            <i className="iconfont iconclock" />
            00时22分19秒
          </div> */}
          <div className="time">
            <i className="iconfont iconcalendar"></i>
            {toDateTime(event.play_at)}
          </div>
          <div className="tricks-num"></div>
        </div>
        <div className="team-col">
          {event.team_home.name}(主) VS {event.team_away.name}
        </div>
        <div className="league-col">{event.league.name}</div>
      </div>
    </div>
  )
}

export default EventItem
