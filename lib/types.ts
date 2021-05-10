export interface OptionType<T = number | string> {
  label: string
  value: T
}

export interface LoginRequest {
  username: string
  password: string
  ckey: string
  captcha: string
}

export interface ResponseBase<T> {
  success: boolean
  data: T
}

export type CaptchaResponse = ResponseBase<{
  key: string
  img: string
}>

export interface UserInfo {
  uid: number
  class: number
  username: string
  name: string
  money: number
  phone: string
  email: string
  qq: string
  weixin: string
  status: number
  is_security_pwd: true
  rebate: { '1': number; '2': number; '3': number }
  login_time: string
  created_at: string
  recharge_min: number
  recharge_max: number
  withdraw_min: number
  withdraw_max: number
}

export interface LoginResponse extends ResponseBase<UserInfo> {
  token: string
}

export interface Lottery {
  id: number
  lottery_type_id: number
  name: string
  logo: string
  keyword: string
}

export interface LotteryListResponse {
  success: boolean
  page: number
  total: number
  list: Lottery[]
}

export interface Goods {
  id: number
  name: string
  pic_icon: string
  price: number
  number: number
  odds: number
}

export type GoodsListResponse = ResponseBase<Goods[]>

export interface Wanfa {
  id: number
  category: number
  name: string
  odds: number
}
export type WanfaListResponse = ResponseBase<Wanfa[]>

export type CurrentQishuResponse = ResponseBase<{
  lottery_name: string
  lottery_logo: string
  qishu: number
  numbers: string[]
  next_qishu: number
  countdown: number
  close_time: number
  status: number
  goods: {
    name: string
    number: number
    pic_icon: string
    type_name: string
  }
  wanfa: []
  rank: []
}>

export type UserProfileResponse = ResponseBase<UserInfo>

export interface OpenedRec {
  id: number
  qishu: number
  numbers: string[]
  open_time: string
  value_str: string[]
  goods_name: string
}

export interface OpenedRecResponse {
  success: boolean
  page: number
  total: number
  list: OpenedRec[]
}

export interface BetRec {
  id: number
  uid: number
  username: string
  class: number
  lottery_id: number
  lottery: string
  qishu: number
  name: string
  pic_icon: string
  price: string
  bet_number: number
  total_price: number
  profit: number
  odds: number
  bet_values: string
  is_lose_win: number
  status: number
  created_at: string
}

export interface BetRecResponse {
  success: boolean
  page: number
  total: number
  data: {
    bet_money: string
    win: string
    profit: string
    list: BetRec[]
  }
}

export interface LeaderBoard {
  rank: number
  uid: number
  username: string
  count: number
}

export interface LeaderBoardResponse {
  success: boolean
  page: number
  total: number
  data: {
    total: number
    list: LeaderBoard[]
  }
}

export interface Activity {
  id: number
  type: number
  title: string
  summary: string
  tiny_pic: string
  content: string
  sort: number
  thumbnail: string
}

export type ActivityListResponse = ResponseBase<Activity[]>
export interface ActivityResponse {
  success: boolean
  data: Activity
}

export interface BankCard {
  id: number
  name: string
  account: string
  bank: string
  bank_name: string
  province: string
  city: string
  status: number
}

export interface BankCardListResponse {
  success: boolean
  page: number
  total: number
  list: BankCard[]
}

export interface BankCardCreateRequest {
  name: string
  account: string
  bank_id: string
  bank_name: string
  province: string
  city: string
  status: number
}

export interface BankListResponse {
  success: boolean
  list: Record<string, string>
}
export type FirstBankNameResponse = ResponseBase<{ name: string }>

export interface BetTarget {
  id: number
  odds: number
  bet_number: number
  bet_money?: number
}

export interface ChartItem {
  date: string
  profit: string
}

export type GoodInfoResponse = ResponseBase<{
  name: string
  pic_icon: string
  price: number
  number: number
  chart: ChartItem[]
}>
export interface BetConfirmRequest {
  lottery_id: number
  goods_id: number
  qishu: number
  bet_list: BetTarget[]
}

export type BetConfirmResponse = ResponseBase<{
  bet_number: number
  total_p_value: number
  profit: number
  money: number
  bet_list: BetTarget[]
}>

export interface BetActionRequest extends BetConfirmRequest {}

export interface BetActionResponse {
  success: boolean
  message: string
  order_sn: string
}

export interface BetSuccessRequest {
  order_sn: string
}
export type BetSuccessResponse = ResponseBase<{
  order_sn: string
  profit: number
  total: number
  open_time: string
  qishu: number
  created_at: string
  lottery_name: string
  goods_name: string
  wanfa: string
}>

export type FinanceRecResponse = ResponseBase<{
  recharge: number
  withdraw: number
}>

export interface RechargeLog {
  id: number
  order_sn: string
  description: string
  money: number
  status: number
  remark: string
  created_at: string
}

export interface RechargeLogResponse {
  success: boolean
  page: number
  total: number
  list: RechargeLog[]
}

export interface WithdrawLog {
  id: number
  order_sn: string
  money: number
  remark: string
  status: number
  created_at: string
}
export interface WithdrawLogResponse {
  success: boolean
  page: number
  total: number
  list: WithdrawLog[]
}

export interface Notice {
  id: number
  name: string
  content: string
}

export interface NoticeListResponse {
  success: boolean
  page: number
  total: number
  list: Notice[]
}
export interface LogoutResponse {
  success: boolean
  message: string
}
