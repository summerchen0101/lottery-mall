import useRequest from '@/utils/useRequest'
import { useState } from 'react'

export default function useCancelBet() {
  const { post } = useRequest()
  const [isLoading, setIsLoading] = useState(false)
  // const [resData, setResData] = useState<{ success: boolean }>()
  const handler = async (id: number) => {
    setIsLoading(true)
    const res = await post<{ success: boolean }>('lottery/cancelBet', {
      bet_id: id,
    })
    // setResData(res)
    setIsLoading(false)
    return res
  }
  return {
    isLoading,
    handler,
    // isError: !isLoading && resData?.success === false,
  }
}
