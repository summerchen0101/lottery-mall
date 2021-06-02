import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface NoticeRes {
  success: boolean
  data: {
    name: string
    content: string
  }
}

export default function useNotice(id: number) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<NoticeRes>(
    id && ['/notice', id],
    (url, id) => request('post', url, { id }),
  )
  return {
    notice: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
