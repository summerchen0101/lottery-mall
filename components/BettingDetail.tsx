import { BetRecord } from '@/lib/types'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import numeral from 'numeral'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { sectionOpts } from '@/lib/options'

const BettingDetail: React.FC<{ bet: BetRecord }> = ({ bet }) => {
  const { copyToClipboard } = useHelper()
  const { toDateTime, toOptionName } = useTransfer()
  return (
    <Box className="detail-content" display="block">
      <ul className="title-inner">
        <li className="title-item">单号</li>
        <li className="title-item">开赛时间</li>
        <li className="title-item">交易时间</li>
        <li className="title-item">联盟</li>
        <li className="title-item">队伍</li>
        <li className="title-item">比分</li>
        {/* <li className="title-item">金额</li> */}
        <li className="title-item">赔率</li>
        {/* <li className="title-item">预估获利</li> */}
      </ul>
      <ul className="content-inner">
        <li className="content-item">
          {numeral(bet.id).format('0000')}
          {/* <button
            className="icon_btn"
            onClick={() => copyToClipboard(numeral(bet.id).format('0000'))}
          >
            <i className="iconcopy iconfont" />
          </button> */}
          {/* <button
            className="mini_btn color-red"
            data-toggle="modal"
            data-target="#revokeModal"
          >
            撤单
          </button> */}
        </li>
        <li className="content-item">{toDateTime(bet.handicap.play_at)}</li>
        <li className="content-item">{toDateTime(bet.created_at)}</li>
        <li className="content-item">{bet.handicap.team_home.league_name}</li>
        <li className="content-item">
          {bet.handicap.team_home.name}(主) VS {bet.handicap.team_away.name}
        </li>
        <li className="content-item">
          <span className="text-red">反对</span>
          {toOptionName(sectionOpts, bet.section_code)}坡胆 {bet.home_point}-
          {bet.away_point}
        </li>
        {/* <li className="content-item">{bet.amount}</li> */}
        <li className="content-item">{(bet.odds * 100).toFixed(2)}%</li>
        {/* <li className="content-item">
          <span className="text-green">2.56</span>
          <span className="text-yellow ml-3">已扣除手续费5%</span>
        </li> */}
      </ul>
    </Box>
  )
}

export default BettingDetail
