import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface PaymentBranch {
  id: number
  name: string
  slug: string
  type: number
  has_recharge_online: boolean
  has_recharge_online_without_status: boolean
}

interface PaymentBranchListRes {
  success: boolean
  data: PaymentBranch[]
}

export default function usePaymentBranchList(payment_id: number) {
  const { get } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<PaymentBranchListRes>(
    payment_id && `/payment/branch/${payment_id}`,
    get,
  )
  return {
    paymentBranchs: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
