import { WithdrawLogResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useWithdrawLog(start: string, end: string) {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<WithdrawLogResponse>(
    start && end && ['/finance/withdrawLog', start, end],
    (url, created_at1, created_at2) => post(url, { created_at1, created_at2 }),
  )
  return {
    withdrawList: res?.list,
    total: res?.total,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
