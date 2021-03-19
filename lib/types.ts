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

export type CurrentQishuResponse = ResponseBase<{
  lottery_name: string
  lottery_logo: string
  qishu: number
  numbers: string[]
  next_qishu: number
  countdown: number
  close_time: number
  status: number
  goods: []
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
