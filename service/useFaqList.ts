import { NoticeListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useFaqList() {
  const type = 2
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<NoticeListResponse>(
    ['/noticelist', type],
    (url, type) => request('post', url, { type }),
  )
  return {
    faqList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
