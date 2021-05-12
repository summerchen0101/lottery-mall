import { NoticeListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useFaqList() {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<NoticeListResponse>(
    '/noticelist',
    (url) => request('post', url, { type: 2 }),
  )
  return {
    faqList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
