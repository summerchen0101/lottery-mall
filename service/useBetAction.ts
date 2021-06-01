import { request } from '@/utils/request'
import { useState } from 'react'

export interface BetTarget {
  id: number
  odds: number
  bet_number: number
  bet_money?: number
}

export interface BetActionReq {
  lottery_id: number
  goods_id: number
  qishu: number
  bet_list: BetTarget[]
}

export interface BetActionRes {
  success: boolean
  message: string
  order_sn: string
}

export default function useBetAction() {
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState<BetActionRes>()
  const handler = async (data: BetActionReq) => {
    setIsLoading(true)
    const res = await request<BetActionRes>({
      method: 'post',
      url: 'lottery/betAction',
      data,
    })
    setResData(res)
    setIsLoading(false)
  }
  return {
    isLoading,
    mutate: (req: BetActionReq) => handler(req),
    orderSn: resData?.order_sn,
    isError: !isLoading && resData?.success === false,
  }
}
