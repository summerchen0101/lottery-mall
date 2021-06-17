import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export interface Lottery {
  id: number
  lottery_type_id: number
  name: string
  logo: string
  keyword: string
}

export interface LotteryListResponse {
  success: boolean
  page: number
  total: number
  list: Lottery[]
}

export default function useLotteryList() {
  const { post } = useRequest()
  const {
    data: res,
    error,
    mutate,
    isValidating,
  } = useSWR<LotteryListResponse>('lottery/getList', post, {
    revalidateOnFocus: false,
  })
  return {
    lotteryList: res?.list,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
