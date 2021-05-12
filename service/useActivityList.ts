import { ActivityListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useActivityList() {
  const { get } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<ActivityListResponse>('/activity', get)
  return {
    activityList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
