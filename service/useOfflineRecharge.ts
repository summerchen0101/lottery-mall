import useRequest from '@/utils/useRequest'
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
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState<OfflineRechargeRes>()
  const mutate = async (data: OfflineRechargeReq) => {
    setIsLoading(true)
    const res = await post<OfflineRechargeRes>('/finance/recharge', data)
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
