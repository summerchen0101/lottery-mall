import { ResBase, UserInfo } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useUserInfo() {
  const { get } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<ResBase<UserInfo>>(
    '/member/view',
    (url) => get(url),
  )
  return {
    user: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
