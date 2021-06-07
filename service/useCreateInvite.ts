import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface CreateInviteReq {
  type: number
  name: string
  lottery_type_id: number
}

export type CreateInviteRes = { success: boolean }

export default function useCreateInvite() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: CreateInviteReq) => {
    setIsLoading(true)
    const res = await post<CreateInviteRes>('agent/createInvite', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
