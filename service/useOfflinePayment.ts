import { OfflinePayment } from '@/lib/enums'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface OfflineBankcard {
  id: number
  bank: string
  name: string
  account: string
  qrcode: string
  money_between: string
  money_min: number
  money_max: number
}

interface OfflineBankcardRes {
  success: boolean
  list: OfflineBankcard[]
}

export default function useOfflinePayment(payment: OfflinePayment) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<OfflineBankcardRes>(
    payment && ['/finance/rechargeOffline', payment],
    (url, channel) => post(url, { channel }),
  )
  return {
    paymentList: res?.list,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
