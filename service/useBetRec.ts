import { BetRecResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useBetRec(page = 1) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<BetRecResponse>(
    ['/lottery/getBetList', page],
    (url, page) => request('post', url, { page, perpage: 50 }),
  )
  return {
    betRecData: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
