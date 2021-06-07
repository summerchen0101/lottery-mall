import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface CreateMemberReq {
  type: number
  username: string
  password: string
  confirm_password: string
  lottery_type_id: number
}

export type CreateMemberRes = { success: boolean }

export default function useCreateMember() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: CreateMemberReq) => {
    setIsLoading(true)
    const res = await post<CreateMemberRes>('agent/createUser', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
