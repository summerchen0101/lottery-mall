import { InviteStatus } from '@/lib/enums'
import { ResponseBase } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export interface InviteUpdateReq {
  invite_id: number
  status: InviteStatus
}

export type InviteUpdateRes = { success: boolean }

export default function useInviteUpdate() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (data: InviteUpdateReq) => {
    setIsLoading(true)
    const res = await post<InviteUpdateRes>('agent/inviteUpdate', data)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
  }
}
