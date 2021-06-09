import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface RankChart {
  date: string
  profit: string
  bet_total: number
}

interface RankChartRes {
  success: boolean
  data: RankChart[]
}

export default function useRankChart() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<RankChartRes>(
    '/lottery/chart',
    (url) => post(url, { lottery_id: 6 }),
  )
  return {
    rankList: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
