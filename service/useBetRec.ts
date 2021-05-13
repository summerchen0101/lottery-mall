import { BetRecResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useBetRec(start: string, end: string) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<BetRecResponse>(
    start && end && ['/lottery/getBetList', start, end],
    (url, created_at1, created_at2) =>
      request('post', url, { created_at1, created_at2 }),
  )
  return {
    betRecData: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
