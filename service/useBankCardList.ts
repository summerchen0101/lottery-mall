import { BankCardListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useBankCardList() {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<BankCardListResponse>('/user/bankList', post)
  return {
    bankcardList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
