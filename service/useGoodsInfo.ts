import { GoodInfoResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useGoodsInfo(goods_id: number) {
  const { request } = useRequest()
  const router = useRouter()
  const lottery_id = useMemo(() => +router.query.id, [router.query])
  const { data: res, error, mutate, isValidating } = useSWR<GoodInfoResponse>(
    lottery_id && goods_id && ['/lottery/getGoods', lottery_id, goods_id],
    (url, lottery_id, lottery_goods_id) =>
      request('post', url, { lottery_id, lottery_goods_id }),
  )
  return {
    goodsInfo: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
