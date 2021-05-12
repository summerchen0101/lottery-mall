import { CurrentQishuResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useCurrentQishu() {
  const { request } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<CurrentQishuResponse>(
    '/lottery/getCurrentQishu',
    (url) => request('post', url, { lottery_id: 6 }),
    { refreshInterval: 1000 },
  )
  return {
    data: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
