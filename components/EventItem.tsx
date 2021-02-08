import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { useGlobalProvider } from '@/context/GlobalProvider'

function EventItem({ event }: { event: Handicap }) {
  const router = useRouter()
  const { toDateTime } = useTransfer()
  const { setEventInfo } = useGlobalProvider()
  const handleEventClicked = () => {
    setEventInfo(event)
    router.push(`/event/${event.id}`)
  }
  return (
    <div className="team-item" onClick={handleEventClicked}>
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
