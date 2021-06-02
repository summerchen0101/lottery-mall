import { NoticeType } from '@/lib/enums'
import { NoticeListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useNoticeList(noticeType: NoticeType) {
  const { request } = useRequest()
  const type = useMemo(() => {
    const typeMap = {
      [NoticeType.News]: [1, 3],
      [NoticeType.Faq]: 2,
    }
    return typeMap[noticeType]
  }, [noticeType])
  const { data: res, error, mutate, isValidating } = useSWR<NoticeListResponse>(
    type && ['/noticelist', type],
    (url, type) => request('post', url, { type }),
  )
  return {
    noticeList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
