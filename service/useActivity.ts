import { ActivityResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useActivity(id: number) {
  const { get } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<ActivityResponse>(
    id && `/activity/${id}`,
    get,
  )
  return {
    activity: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
