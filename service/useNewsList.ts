import { NoticeListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useNewsList() {
  const { request } = useRequest()
  const type = useMemo(() => [1, 3], [])
  const { data: res, error, mutate, isValidating } = useSWR<NoticeListResponse>(
    ['/noticelist', type],
    (url, type) => request('post', url, { type }),
  )
  return {
    newsList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
