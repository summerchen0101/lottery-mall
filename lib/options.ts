import {
  AccountingStatus,
  GameStatus,
  NewsType,
  ProcessStatus,
  Section,
  WalletRecType,
} from './enums'
import bankCodes from './bankCodes'

export const bankCodeOpts = bankCodes.map((t) => ({
  label: `${t.name}(${t.code})`,
  value: t.code,
}))

export const dateOpts = [
  { label: '今日', value: 'today' },
  { label: '昨日', value: 'yesterday' },
  { label: '本週', value: 'thisWeek' },
  { label: '上週', value: 'lastWeek' },
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' },
]

export const beforeDateRangeOpts = [
  { label: '本週', value: 'thisWeek' },
  { label: '上週', value: 'lastWeek' },
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' },
  { label: '近一年', value: 'inYear' },
]
export const afterDateRangeOpts = [
  { label: '今日', value: 'today' },
  { label: '明日', value: 'tomorrow' },
  { label: '本週', value: 'thisWeek' },
  { label: '下週', value: 'nextWeek' },
]

export const newsTypeOpts = [
  { label: '系統通知', value: NewsType.System },
  { label: '賽事公告', value: NewsType.Game },
  { label: '活動優惠', value: NewsType.Activity },
]
export const sectionOpts = [
  { label: '全場', value: Section.Full },
  { label: '半場', value: Section.FirstHalf },
]

export const accountingStatusOpts = [
  { label: '未結帳', value: AccountingStatus.Pending },
  { label: '結帳中', value: AccountingStatus.Running },
  { label: '已結帳', value: AccountingStatus.Finish },
  { label: '已取消', value: AccountingStatus.Cancel },
]
export const processStatusOpts = [
  { label: '待處理', value: ProcessStatus.Pending },
  { label: '處理中', value: ProcessStatus.Running },
  { label: '已完成', value: ProcessStatus.Finish },
  { label: '已取消', value: ProcessStatus.Cancel },
]

export const gameStatusOpts = [
  { label: '走地', value: GameStatus.Live },
  { label: '未開賽', value: GameStatus.Preparing },
  { label: '完賽', value: GameStatus.Finished },
  { label: '待定', value: GameStatus.Determining },
  { label: '取消', value: GameStatus.Canceled },
  { label: '延期', value: GameStatus.Postpone },
]

export const walletRecTypeOpts = [
  { label: '充值', value: WalletRecType.Deposit },
  { label: '人工加扣', value: WalletRecType.Manual },
  { label: '提領', value: WalletRecType.Withdraw },
  { label: '投注', value: WalletRecType.Bet },
  { label: '投注取消退還', value: WalletRecType.BetCancel },
  { label: '投注結果', value: WalletRecType.BetResult },
  { label: '結帳修正', value: WalletRecType.AccountingFix },
  { label: '退水', value: WalletRecType.Rebate },
  { label: '轉帳', value: WalletRecType.Transfer },
  { label: '活動獎勵', value: WalletRecType.Activirty },
]

export const tradeTabOpts = [
  { label: '資金纪录', value: 'wallet' },
  { label: '充值纪录', value: 'deposit' },
  { label: '提领纪录', value: 'withdraw' },
  { label: '轉移纪录', value: 'transfer' },
]

export const paywayOpts = [
  { label: '银行卡转卡', value: 1 },
  { label: 'ATM', value: 2 },
]
