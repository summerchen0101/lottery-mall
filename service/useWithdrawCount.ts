import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface WithdrawCountRes {
  success: boolean
  data: number
}

export default function useWithdrawCount() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<WithdrawCountRes>(
    '/finance/withdrawCount',
    post,
  )
  return {
    count: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
