import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface OnlineRechargeReq {
  money: string
  interface: number
  payments_branch_id: number
}

export interface OnlineRechargeRes {
  success: boolean
  data: {
    url: string
    dataType: number
    orderSn: string
  }
}

export default function useOnlineRecharge() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const [resData, setResData] = useState<OnlineRechargeRes>()
  const mutate = async (data: OnlineRechargeReq) => {
    setIsLoading(true)
    const res = await post<OnlineRechargeRes>('payment/pay', data)
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
