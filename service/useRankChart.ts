import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
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

export default function useRankChart(lottery_id: number) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<RankChartRes>(
    lottery_id && ['/lottery/chart', lottery_id],
    (url, lottery_id) => post(url, { lottery_id }),
  )
  return {
    rankList: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
