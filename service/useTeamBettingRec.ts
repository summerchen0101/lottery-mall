import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface TeamBetting {
  id: number
  uid: number
  username: string
  class: number
  lottery_id: number
  lottery: string
  qishu: number
  name: string
  pic_icon: string
  price: string
  bet_number: number
  total_price: number
  profit: number
  odds: number
  bet_values: string
  is_lose_win: number
  status: number
  created_at: string
}

interface TeamBettingRecRes {
  success: boolean
  page: number
  total: number
  data: {
    bet_money: string
    win: string
    profit: string
    list: TeamBetting[]
  }
}
export interface TeamBettingRecReq {
  created_at1: string
  created_at2: string
  username?: string
  uid?: string
  page?: number
  per_page?: number
}

export default function useTeamBettingRec({
  created_at1,
  created_at2,
  username,
  uid,
}: TeamBettingRecReq) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<TeamBettingRecRes>(
    created_at1 &&
      created_at2 && [
        'agent/teamBetList',
        created_at1,
        created_at2,
        username,
        uid,
      ],
    (url, created_at1, created_at2, username, uid) =>
      post(url, {
        created_at1,
        created_at2,
        username,
        uid,
        page: 1,
        per_page: 50,
      }),
  )
  return {
    bet_money: res?.data.bet_money,
    win: res?.data.win,
    profit: res?.data.profit,
    bettingList: res?.data.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
