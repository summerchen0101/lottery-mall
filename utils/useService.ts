import {
  CaptchaResponse,
  CurrentQishuResponse,
  GoodsListResponse,
  LoginRequest,
  LoginResponse,
  LotteryListResponse,
  ResponseBase,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import { useCallback } from 'react'
import useSWR from 'swr'
import useRequest from './useRequest'

function useService() {
  const toast = useToast()
  const { post, get, request } = useRequest()

  const useCaptcha = useCallback(() => {
    const { data, error } = useSWR<CaptchaResponse>('/captcha', post)
    return {
      captcha: data?.data?.img,
      key: data?.data?.key,
      isLoading: !data && !error,
    }
  }, [])

  const doLogin = (req: LoginRequest) => post<LoginResponse>('/login', req)

  const getNotices = () => post<any>('/noticelist', { type: [1, 3] })
  // const getLotteryList = () => post<any>('/lottery/getList')

  const useLotteryList = () =>
    useSWR<LotteryListResponse>('/lottery/getList', post)

  const useGoodsList = (id: number) =>
    useSWR<GoodsListResponse>(
      id && ['/lottery/getGoodsList', id],
      (url, lottery_id) => request('post', url, { lottery_id }),
    )
  const useCurrentQishu = (id: number) =>
    useSWR<CurrentQishuResponse>(
      id && ['/lottery/getCurrentQishu', id],
      (url, lottery_id) => request('post', url, { lottery_id }),
    )

  return {
    useCaptcha,
    doLogin,
    useLotteryList,
    getNotices,
    useGoodsList,
    useCurrentQishu,
  }
}

export default useService
