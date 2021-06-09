import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface ServiceLinkRes {
  success: boolean
  message: string
}

export default function useServiceLink() {
  const { get } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<ServiceLinkRes>(
    '/customerservice',
    get,
  )
  return {
    serviceLink: res?.message,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
