import { UserProfileResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useUserInfo() {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<UserProfileResponse>('/user/profile', post)
  return {
    userInfo: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
