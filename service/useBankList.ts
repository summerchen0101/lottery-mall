import { BankListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useBankList() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<BankListResponse>(
    '/finance/bank',
    post,
  )
  return {
    bankList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
