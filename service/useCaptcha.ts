import { CaptchaResponse } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

export default function useCaptcha() {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<CaptchaResponse>(
    '/captcha',
    post,
    {
      revalidateOnFocus: false,
    },
  )
  return {
    captcha: res?.data?.img,
    key: res?.data?.key,
    isLoading: isValidating,
    isError: error,
    refresh: mutate,
  }
}
