import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface BetTarget {
  id: number
  odds: number
  bet_number: number
  bet_money?: number
}

export interface BetConfirmReq {
  lottery_id: number
  goods_id: number
  qishu: number
  bet_list: BetTarget[]
}

export type BetConfirmRes = ResponseBase<{
  bet_number: number
  total_p_value: number
  profit: number
  money: number
  bet_list: BetTarget[]
}>

export default function useBetConfirm() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState<BetConfirmRes>()
  const handler = async (data: BetConfirmReq) => {
    setIsLoading(true)
    const res = await post<BetConfirmRes>('lottery/betConfirm', data)
    setResData(res)
    setIsLoading(false)
  }
  return {
    isLoading,
    handler,
    data: resData?.data,
    isError: !isLoading && resData?.success === false,
  }
}
