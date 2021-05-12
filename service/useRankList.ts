import { LeaderBoardResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useRankList(startAt: string, endAt: string, page = 1) {
  const { request } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<LeaderBoardResponse>(
    startAt && endAt && ['/lottery/leaderboard', startAt, endAt, page],
    (url, created_at1, created_at2, page) =>
      request('post', url, { created_at1, created_at2, page, perpage: 50 }),
  )
  return {
    rankList: res?.data.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
