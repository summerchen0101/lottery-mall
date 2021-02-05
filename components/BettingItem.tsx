import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import BettingDetail from './BettingDetail'
import cs from 'classnames'

const BettingItem: React.FC = () => {
  const { onToggle, isOpen } = useDisclosure()
  return (
    <Box className={cs('detail-item', { show: isOpen })} onClick={onToggle}>
      <div className="detail-header">
        <div className="d-flex justify-content-between">
          <div className="team-col">富山胜利(主)VS熊本深红</div>
          <div className="status">未开</div>
        </div>
        <div className="bet-col">
          <span className="text-red mr-2">反对</span>全场坡胆 0-1
        </div>
        <BettingDetail />
        <div className="detail-footer">
          <div>投注额:100</div>
          <div>预估获利:19</div>
        </div>
      </div>
      <div className="icon-col">
        <i className="iconfont iconallow-down" />
      </div>
    </Box>
  )
}

export default BettingItem
