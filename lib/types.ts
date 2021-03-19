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

export interface LoginResponse
  extends ResponseBase<{
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
  }> {
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
