import { WanfaListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useWanfaList() {
  const { request } = useRequest()
  const router = useRouter()
  const lottery_id = useMemo(() => +router.query.id, [router.query])
  const { data: res, error, mutate, isValidating } = useSWR<WanfaListResponse>(
    lottery_id && ['/lottery/getWanfaList', lottery_id],
    (url, lottery_id) => request('post', url, { lottery_id }),
  )
  return {
    wanfaList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
