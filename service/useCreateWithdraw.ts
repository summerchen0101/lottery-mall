import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface CreateWithdrawReq {
  user_bank_id: string
  money: number
  security_pwd: string
}

export type CreateWithdrawRes = ResponseBase<number>

export default function useCreateWithdraw() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: CreateWithdrawReq) => {
    setIsLoading(true)
    const res = await post<CreateWithdrawRes>('finance/withdraw', data)
    setIsLoading(false)
    return res.data
  }
  return {
    isLoading,
    handler,
  }
}
