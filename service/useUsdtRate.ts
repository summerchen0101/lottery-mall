import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface UsdtRateRes {
  success: boolean
  data: {
    web_title: string
    confirm_sec: number
    usdt_auto: string
    usdt_transfer_rate: string
    marquee: string
    index_youtube: string
  }
}

export default function useUsdtRate() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<UsdtRateRes>(
    '/param',
    post,
    { refreshInterval: 60 * 1000 },
  )
  return {
    rate: res?.data.usdt_transfer_rate,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
