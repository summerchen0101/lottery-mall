import { UserProfileResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface PaymentChannel {
  id: number
  interface: number
  name: string
  payments_branch_id: number
  multiple: number
  day_limit: number
  grand_total_limit: number
  money_min: number
  money_max: number
  status: number
  payment_name: string
  payment_branch_name: string
  payment: { id: number; name: string; laravel_through_key: number }
  payment_branch: {
    id: number
    payments_id: number
    type: number
    name: string
    slug: string
    has_recharge_online: boolean
    has_recharge_online_without_status: boolean
  }
}

interface PaymentChannelListRes {
  success: boolean
  data: PaymentChannel[]
}

export default function usePaymentChannelList(payment_branch_id: number) {
  const { get } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<PaymentChannelListRes>(
    payment_branch_id && `/payment/channel/${payment_branch_id}`,
    get,
  )
  return {
    paymentChannels: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
