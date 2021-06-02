import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface NewsRes {
  success: boolean
  data: {
    name: string
    content: string
  }
}

export default function useNews(id: number) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<NewsRes>(
    id && ['/notice', id],
    (url, id) => request('post', url, { id }),
  )
  return {
    news: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
