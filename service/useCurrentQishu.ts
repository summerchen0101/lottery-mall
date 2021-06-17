import { CurrentQishuResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useCurrentQishu() {
  const { request } = useRequest()
  const router = useRouter()
  const lottery_id = useMemo(() => +router.query.id, [router.query])
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<CurrentQishuResponse>(
    lottery_id && ['/lottery/getCurrentQishu', lottery_id],
    (url, lottery_id) => request('post', url, { lottery_id }),
    { refreshInterval: 1000 * 60 },
  )
  return {
    data: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
