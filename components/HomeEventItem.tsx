import { useGlobalProvider } from '@/context/GlobalProvider'
import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import numeral from 'numeral'
import { Text } from '@chakra-ui/layout'

const HomeEventItem: React.FC<{ event: Handicap }> = ({ event }) => {
  const router = useRouter()
  const { toDateTime } = useTransfer()
  return (
    <div
      className="team-item"
      onClick={() => router.push(`/event/${event.id}`)}
    >
      <div className="info-col">
        <div className="time">
          <i className="iconfont iconcalendar"></i>
          {toDateTime(event.play_at)}
        </div>
        <Text fontSize="sm">
          {event.team_home.name}(主) VS {event.team_away.name}
        </Text>
        <Text className="league-col">{event.team_home.league_name}</Text>
      </div>
      <div className="chart-col">
        <div className="count text-blue">
          {numeral(event?.bet_sum).divide(10000).format('0,0')}M
        </div>
        <span>總搶購量</span>
      </div>
    </div>
  )
}

export default HomeEventItem
