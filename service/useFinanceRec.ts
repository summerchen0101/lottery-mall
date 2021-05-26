import { FinanceRecResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useFinanceRec(start: string, end: string) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<FinanceRecResponse>(
    start && end && ['/finance/record', start, end],
    (url, created_at1, created_at2) => post(url, { created_at1, created_at2 }),
  )
  return {
    recharge: res?.data.recharge,
    withdraw: res?.data.withdraw,
    discount: res?.data.discount,
    agentDiscount: res?.data.discount_offline,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
