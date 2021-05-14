import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface CodeAmount {
  id: number
  type: number
  type_str: string
  money: string
  need: string
  effect: string
  status: number
  created_at: string
}

interface CodeAmountListRes {
  success: boolean
  total: number
  page: number
  list: CodeAmount[]
}

export default function useCodeAmountList(start: string, end: string) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<CodeAmountListRes>(
    start && end && ['/finance/codeAmount', start, end],
    (url, created_at1, created_at2) =>
      request('post', url, { created_at1, created_at2 }),
  )
  return {
    codeAmountList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
