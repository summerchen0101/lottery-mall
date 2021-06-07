import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface CreateBankcardReq {
  name: string
  account: string
  bank_id: string
  bank_name: string
  province: string
  city: string
  status: number
}

export type CreateBankcardRes = ResponseBase<null>

export default function useCreateBankcard() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: CreateBankcardReq) => {
    setIsLoading(true)
    const res = await post<CreateBankcardRes>('user/bankCreate', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
