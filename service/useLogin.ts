import { ResponseBase, UserInfo } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface LoginReq {
  username: string
  password: string
  ckey: string
  captcha: string
}

export interface LoginRes extends ResponseBase<UserInfo> {
  token: string
}

export default function useLogin() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: LoginReq) => {
    setIsLoading(true)
    const res = await post<LoginRes>('login', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
