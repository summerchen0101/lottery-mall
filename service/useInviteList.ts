import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface Invite {
  id: number
  type: number
  name: string
  invite: string
  rebate: number
  status: number
}

interface InviteListRes {
  success: boolean
  page: number
  total: number
  data: Invite[]
}

export default function useInviteList() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<InviteListRes>(
    'agent/inviteList',
    (url) => post(url, { lottery_type_id: 1, page: 1, per_page: 50 }),
  )
  return {
    inviteList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
