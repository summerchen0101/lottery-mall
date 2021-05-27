import { GoodsListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useGoodsList() {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<GoodsListResponse>(
    '/lottery/getGoodsList',
    (url) => request('post', url, { lottery_id: 6 }),
  )
  return {
    goodsList: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
