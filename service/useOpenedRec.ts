import { OpenedRecResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useOpenedRec(page = 1) {
  const { request } = useRequest()
  const router = useRouter()
  const lottery_id = useMemo(() => +router.query.id, [router.query])
  const { data: res, error, mutate, isValidating } = useSWR<OpenedRecResponse>(
    lottery_id && ['/lottery/getOpenList', lottery_id, page],
    (url, lottery_id, page) =>
      request('post', url, { lottery_id, page, perpage: 50 }),
  )
  return {
    openedList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
