import { DiscountLogType } from '@/lib/enums'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface DiscountLog {
  id: number
  order_sn: string
  description: string
  money: number
  status: number
  remark: string
  created_at: string
}

export interface DiscountLogResponse {
  success: boolean
  page: number
  total: number
  list: DiscountLog[]
}

export default function useDiscountLog(
  start: string,
  end: string,
  type: DiscountLogType,
) {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<DiscountLogResponse>(
    start && end && type && ['/finance/discountLog', start, end, type],
    (url, created_at1, created_at2, type) =>
      post(url, { created_at1, created_at2, type }),
  )
  return {
    discountList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
