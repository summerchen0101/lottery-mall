import {
  BankCardStatus,
  DateRangeType,
  RechargeStatus,
  WithdrawStatus,
} from './enums'

export const financeRecDateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '本週', value: DateRangeType.ThisWeek },
  { label: '上週', value: DateRangeType.LastWeek },
  { label: '本月', value: DateRangeType.ThisMonth },
  { label: '上月', value: DateRangeType.LastMonth },
  { label: '近一年', value: DateRangeType.inYear },
]

export const rankDateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '本週', value: DateRangeType.ThisWeek },
  { label: '本月', value: DateRangeType.ThisMonth },
]

export const betDateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '本週', value: DateRangeType.ThisWeek },
  { label: '上週', value: DateRangeType.LastWeek },
  { label: '本月', value: DateRangeType.ThisMonth },
]

export const bankcardStatusOpts = [
  { label: '启用', value: BankCardStatus.On },
  { label: '未启用', value: BankCardStatus.Off },
]

export const rechargeStatusOpts = [
  { label: '充值成功', value: RechargeStatus.Success },
  { label: '充值失败', value: RechargeStatus.Fail },
]

export const withdrawStatusOpts = [
  { label: '提领成功', value: WithdrawStatus.Success },
  { label: '提领失败', value: WithdrawStatus.Fail },
]
