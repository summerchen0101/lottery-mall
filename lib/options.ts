import { BankCardStatus, DateRangeType, RechargeStatus } from './enums'

export const financeRecDateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '本週', value: DateRangeType.ThisWeek },
  { label: '本月', value: DateRangeType.ThisMonth },
  { label: '近一年', value: DateRangeType.inYear },
]

export const rankDateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '本週', value: DateRangeType.ThisWeek },
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
