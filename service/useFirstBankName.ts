import { FirstBankNameResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useFirstBankName() {
  const { get } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<FirstBankNameResponse>('/user/bank/first', get)
  return {
    firstBankName: res?.data.name,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
