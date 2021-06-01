import { GoodsListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useGoodsList(goodsCode?: number) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<GoodsListResponse>(
    ['/lottery/getGoodsList', goodsCode],
    (url, code) => request('post', url, { lottery_id: 6, code }),
  )
  return {
    goodsList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
