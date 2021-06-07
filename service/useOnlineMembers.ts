import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface OnlineUser {
  id: number
  username: string
  type: number
  money: number
  login_time: string
  login_ip: string
}

interface OnlineMembersRes {
  success: boolean
  page: number
  total: number
  data: [
    {
      id: 771423
      username: 'agent88'
      type: 0
      money: 0
      login_time: '2021-06-07 20:29:11'
      login_ip: '123.205.126.223'
    },
  ]
}

export default function useOnlineMembers() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<OnlineMembersRes>(
    'agent/onlineUser',
    (url) => post(url, { page: 1, per_page: 50 }),
  )
  return {
    onlineMembers: res?.data,
    total: res?.total,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
