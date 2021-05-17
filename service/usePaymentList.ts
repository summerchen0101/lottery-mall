import { OfflinePayment } from '@/lib/enums'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface OnlinePayment {
  id: number
  name: string
}
interface PaymentListRes {
  success: boolean
  data: {
    online: OnlinePayment[]
    offline: Record<OfflinePayment, boolean>
  }
}

export default function usePaymentList() {
  const { get } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<PaymentListRes>(
    '/payment',
    get,
  )
  return {
    offline: res?.data.offline,
    online: res?.data.online,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
