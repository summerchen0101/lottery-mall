import { WanfaListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useWanfaList() {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<WanfaListResponse>(
    '/lottery/getWanfaList',
    (url) => request('post', url, { lottery_id: 6 }),
  )
  return {
    wanfaList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
