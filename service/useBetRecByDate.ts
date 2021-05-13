import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface DateBetRec {
  date: string
  bet_money: number
  win_money: number
  profit: number
}

interface BetRecByDateRes {
  success: boolean
  data: {
    bet_money: string
    win_money: string
    profit: string
    list: DateBetRec[]
  }
}

export default function useBetRecByDate(start: string, end: string) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<BetRecByDateRes>(
    start && end && ['/lottery/getDayBet', start, end],
    (url, created_at1, created_at2) =>
      request('post', url, { created_at1, created_at2 }),
  )
  return {
    dateBetData: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
