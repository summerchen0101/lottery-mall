import { GoodInfoResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useGoodsInfo(id: number) {
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<GoodInfoResponse>(
    id && ['/lottery/getGoods', id],
    (url) => request('post', url, { lottery_id: 6, lottery_goods_id: id }),
  )
  return {
    goodsInfo: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
