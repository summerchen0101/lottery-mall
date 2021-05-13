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
  { label: '待審核', value: RechargeStatus.Waiting },
  { label: '充值成功', value: RechargeStatus.Success },
  { label: '充值失败', value: RechargeStatus.Failed },
  { label: '订单超时', value: RechargeStatus.Expired },
  { label: '订单建立失败', value: RechargeStatus.OrderFailed },
  { label: '待付款', value: RechargeStatus.WaitPay },
  { label: '处理中', value: RechargeStatus.Processing },
]

export const withdrawStatusOpts = [
  { label: '待審核', value: WithdrawStatus.Waiting },
  { label: '待出款', value: WithdrawStatus.Pending },
  { label: '提领成功', value: WithdrawStatus.Success },
  { label: '審核失敗', value: WithdrawStatus.ReviewFailed },
  { label: '出款失敗', value: WithdrawStatus.WithdrawFailed },
]
