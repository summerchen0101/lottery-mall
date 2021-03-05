import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import BettingDetail from './BettingDetail'
import { BetRecord } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { accountingStatusOpts, sectionOpts } from '@/lib/options'
import classNames from 'classnames'
import { AccountingStatus } from '@/lib/enums'
import ColorText from './ColorText'

const BettingItem: React.FC<{ bet: BetRecord }> = ({ bet }) => {
  const { onToggle, isOpen } = useDisclosure()
  const { toOptionName, toCurrency, amountToCanWin } = useTransfer()
  return (
    <Box
      className={classNames('detail-item', { show: isOpen })}
      onClick={onToggle}
    >
      <div className="detail-header">
        <div className="d-flex justify-content-between">
          <div className="team-col">
            {bet.handicap.team_home.name}(主) VS {bet.handicap.team_away.name}
          </div>
          <div
            className={classNames(
              'status',
              bet.accounting_status === AccountingStatus.Finish && 'text-blue',
              bet.accounting_status === AccountingStatus.Cancel && 'text-gray',
            )}
          >
            {toOptionName(accountingStatusOpts, bet.accounting_status)}
          </div>
        </div>
        <div className="bet-col">
          <span className="text-red mr-2">反对</span>
          {toOptionName(sectionOpts, bet.section_code)}坡胆 {bet.home_point}-
          {bet.away_point}
        </div>
        <BettingDetail bet={bet} />
        <div className="detail-footer">
          <div>
            投注额: <span className="text-blue">{toCurrency(bet.amount)}</span>
          </div>

          {bet.accounting_status !== AccountingStatus.Pending ? (
            <div>
              結果: <ColorText num={bet.result} fontWeight="500" />
            </div>
          ) : (
            <div>
              预估获利: <ColorText num={amountToCanWin(bet.amount, bet.odds)} />
            </div>
          )}
        </div>
      </div>
      <div className="icon-col">
        <i className="iconfont iconallow-down" />
      </div>
    </Box>
  )
}

export default BettingItem
