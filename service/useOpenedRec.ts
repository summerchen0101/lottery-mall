import { OpenedRecResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useOpenedRec(page = 1) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<OpenedRecResponse>(
    ['/lottery/getOpenList', page],
    (url, page) => request('post', url, { lottery_id: 6, page, perpage: 50 }),
  )
  return {
    openedList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
