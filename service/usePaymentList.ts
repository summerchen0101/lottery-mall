import { OfflinePayment, OnlinePayment } from '@/lib/enums'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface OnlinePaymentItem {
  id: number
  name: string
}
interface PaymentListRes {
  success: boolean
  data: {
    online: OnlinePaymentItem[]
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
    online: res?.data.online.reduce((obj, next) => {
      obj[next.id] = next
      return obj
    }, {}) as Record<OnlinePayment, OnlinePaymentItem>,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
