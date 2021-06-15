import { UserProfileResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useCheckLogin() {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<UserProfileResponse>('/user/profile', (url) =>
    post(url, null, false),
  )
  return {
    isLogin: !!res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
