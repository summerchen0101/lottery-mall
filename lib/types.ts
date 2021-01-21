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

export interface Marquee {
  id: number
  content: string
  url: string
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
  name: string
  promo_code: string
  acc: string
  pass: string
  sec_pass: string
  code: string
}

export interface LoginRequest {
  acc: string
  pass: string
  code: string
}

export interface LoginResponse {
  acc: string
  id: number
  name: string
}

export interface UserInfo {
  id: number
  name: string
  acc: string
}
