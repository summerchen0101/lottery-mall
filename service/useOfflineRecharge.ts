import { request } from '@/utils/request'
import { useState } from 'react'

export interface OfflineRechargeReq {
  name: string
  money: number
  bank: string
  line_id: string
  rate: number
}

export interface OfflineRechargeRes {
  success: boolean
  data: number
}

export default function useOfflineRecharge() {
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState<OfflineRechargeRes>()
  const mutate = async (data: OfflineRechargeReq) => {
    setIsLoading(true)
    const res = await request<OfflineRechargeRes>({
      method: 'post',
      url: '/finance/recharge',
      data,
    })
    setResData(res)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    mutate,
    result: resData,
    isSuccess: !isLoading && resData?.success,
    isError: !isLoading && resData?.success === false,
  }
}
