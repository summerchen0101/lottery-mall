import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface RegisterReq {
  invite: string
  username: string
  password: string
  confirm_password: string
  ckey: string
  captcha: string
}

export type RegisterRes = { success: boolean }

export default function useRegister() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: RegisterReq) => {
    setIsLoading(true)
    const res = await post<RegisterRes>('register', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
