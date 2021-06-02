import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface FaqRes {
  success: boolean
  data: {
    name: string
    content: string
  }
}

export default function useFaq(id: number) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<FaqRes>(
    id && ['/notice', id],
    (url, id) => request('post', url, { id }),
  )
  return {
    faq: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
