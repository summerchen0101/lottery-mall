import { NewsType } from './enums'

export class ResponseBase<T> {
  code: number
  data: T
}

export class BaseListResponse<T> {
  list: T[]
  total_count: number
  total_page: number
}

export interface BaseListRequest {
  page?: number
  perpage?: number
}

export interface DateRangeRequest {
  start_at: number
  end_at: number
}

export type DateRangeListRequest = BaseListRequest & DateRangeRequest

export interface WithdrawListRequest extends DateRangeListRequest {
  usdt_type?: number
  status?: number
}

export interface Member {
  acc: string
  id: number
  name: string
}

export interface CheckLoginResponseData {
  member: Member
}

export interface News {
  id: number
  news_type: NewsType
  title: string
  updated_at: number
  created_at: number
}

export interface NewsDetail {
  id: number
  news_type: NewsType
  title: string
  content: string
  updated_at: number
  created_at: number
}

export interface Activity {
  id: number
  title: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  bonus: number
}

export interface ActivityDetail {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  bonus: number
}

export interface Faq {
  id: number
  catalogue: {
    id: number
    name: string
  }
  title: string
  content: string
  content_mobile: string
  created_at: number
  updated_at: number
}

export interface Marquee {
  id: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
export interface Banner {
  id: number
  title: string
  url: string
  img: string
  img_mobile: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}

export interface PwUpdateRequest {
  pass: string
  code: string
}

export interface RegisterRequest {
  promo_code: string
  acc: string
  name: string
  pass: string
  mobile: string
  email: string
}

export interface LoginRequest {
  acc: string
  pass: string
  code: string
  token: string
}

export interface LoginResponse {
  acc: string
  id: number
  name: string
  token: string
}

export interface UserInfo {
  id: number
  name: string
  acc: string
  balance: number
}

export interface CaptchaResponse {
  img: string
  token: string
}
