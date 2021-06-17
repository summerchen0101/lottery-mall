import { GoodsListResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function useGoodsList(goodsCode?: number) {
  const router = useRouter()
  const lottery_id = useMemo(() => +router.query.id, [router.query])
  const { request } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<GoodsListResponse>(
    lottery_id && ['/lottery/getGoodsList', lottery_id, goodsCode],
    (url, lottery_id, code) => request('post', url, { lottery_id, code }),
  )
  return {
    goodsList: res?.data,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
