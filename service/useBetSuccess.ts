import { BetSuccessResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useBetSuccess(sn: string) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<BetSuccessResponse>(
    sn && ['/lottery/betSuccess', sn],
    (url, order_sn) => post(url, { order_sn }),
  )
  return {
    betInfo: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
