import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface TeamWithdraw {
  id: number
  uid: number
  order_sn: string
  description: string
  money: string
  status: number
  remark: string
  created_at: string
}

interface TeamWithdrawRecRes {
  success: boolean
  page: number
  total: number
  data: {
    apply: string
    money: string
    list: TeamWithdraw[]
  }
}
export interface TeamWithdrawRecReq {
  created_at1: string
  created_at2: string
  username?: string
  uid?: string
  page?: number
  per_page?: number
}

export default function useTeamWithdrawRec({
  created_at1,
  created_at2,
  username,
  uid,
}: TeamWithdrawRecReq) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<TeamWithdrawRecRes>(
    created_at1 &&
      created_at2 && [
        'agent/teamWithdraw',
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
    apply: res?.data.apply,
    money: res?.data.money,
    rechargeList: res?.data.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
