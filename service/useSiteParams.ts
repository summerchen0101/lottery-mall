import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface SiteParamsRes {
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

export default function useSiteParams() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<SiteParamsRes>(
    '/param',
    post,
    { refreshInterval: 60 * 1000 },
  )
  return {
    rate: +res?.data.usdt_transfer_rate,
    marquee: res?.data.marquee,
    video: res?.data.index_youtube,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
