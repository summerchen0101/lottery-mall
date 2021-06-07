import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface Member {
  id: number
  username: string
  type: number
  sub_count: number
  money: number
  money_team: number
  rebate: number
  login_time: string
  created_at: string
}

interface MemberListRes {
  success: boolean
  page: number
  total: number
  data: Member[]
}

export default function useMemberList(parentId: number) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<MemberListRes>(
    ['agent/userList', parentId],
    (url, pid) => post(url, { lottery_type_id: 1, pid, page: 1, per_page: 50 }),
  )
  return {
    memberList: res?.data,
    // isLoading: !error && !res,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
