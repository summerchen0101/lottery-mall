import {
  Activity,
  ActivityListResponse,
  BetRecResponse,
  CaptchaResponse,
  CurrentQishuResponse,
  GoodsListResponse,
  LeaderBoardResponse,
  LoginRequest,
  LoginResponse,
  LotteryListResponse,
  OpenedRecResponse,
  ActivityResponse,
  UserProfileResponse,
  BankCardListResponse,
  BankListResponse,
  FirstBankNameResponse,
  BankCardCreateRequest,
  BetConfirmRequest,
  BetActionRequest,
  BetSuccessRequest,
  BetSuccessResponse,
  BetActionResponse,
  BetConfirmResponse,
  GoodInfoResponse,
  WanfaListResponse,
  FinanceRecResponse,
  RechargeLogResponse,
  WithdrawLogResponse,
  NoticeListResponse,
  LogoutResponse,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import { useCallback } from 'react'
import useSWR from 'swr'
import useRequest from './useRequest'

function useService() {
  const toast = useToast()
  const { post, get, request } = useRequest()

  const useCaptcha = useCallback(() => {
    const { data, mutate, isValidating } = useSWR<CaptchaResponse>(
      '/captcha',
      post,
      {
        revalidateOnFocus: false,
      },
    )
    return {
      captcha: data?.data?.img,
      key: data?.data?.key,
      isLoading: isValidating,
      refresh: mutate,
    }
  }, [])

  const checkLoginStatus = () => post<UserProfileResponse>('/user/profile')

  const doLogin = (req: LoginRequest) => post<LoginResponse>('/login', req)

  const doLogout = () => post<LogoutResponse>('/logout')

  const doCreateBankCard = (req: BankCardCreateRequest) =>
    post<null>('/user/bankCreate', req)

  const doBetConfirm = (req: BetConfirmRequest) =>
    post<BetConfirmResponse>('/lottery/betConfirm', req)

  const doBetAction = (req: BetActionRequest) =>
    post<BetActionResponse>('/lottery/betAction', req)

  const useLotteryList = () =>
    useSWR<LotteryListResponse>('/lottery/getList', post)

  const useWanfaList = (id: number) =>
    useSWR<WanfaListResponse>(
      id && ['/lottery/getWanfaList', id],
      (url, lottery_id) => request('post', url, { lottery_id }),
    )

  const useGoodsList = (id: number) =>
    useSWR<GoodsListResponse>(
      id && ['/lottery/getGoodsList', id],
      (url, lottery_id) => request('post', url, { lottery_id }),
    )
  const useCurrentQishu = (id: number) =>
    useSWR<CurrentQishuResponse>(
      id && ['/lottery/getCurrentQishu', id],
      (url, lottery_id) => request('post', url, { lottery_id }),
      { refreshInterval: 1000 },
    )

  const useOpenedRec = (id: number, p = 1, per = 50) =>
    useSWR<OpenedRecResponse>(
      id && ['/lottery/getOpenList', id, p, per],
      (url, lottery_id, page, perpage) =>
        request('post', url, { lottery_id, page, perpage }),
    )

  const useBetRec = (p = 1, per = 50) =>
    useSWR<BetRecResponse>(
      ['/lottery/getBetList', p, per],
      (url, page, perpage) => request('post', url, { page, perpage }),
    )

  const useLeaderBoard = (startAt: string, endAt: string, p = 1, per = 50) =>
    useSWR<LeaderBoardResponse>(
      startAt && endAt && ['/lottery/leaderboard', startAt, endAt, p, per],
      (url, created_at1, created_at2, page, perpage) =>
        request('post', url, { created_at1, created_at2, page, perpage }),
    )

  const useUserProfile = () =>
    useSWR<UserProfileResponse>('/user/profile', post)

  const useBankCardList = () =>
    useSWR<BankCardListResponse>('/user/bankList', post)

  const useBankList = () => useSWR<BankListResponse>('/finance/bank', post)

  const useFirstBankName = () =>
    useSWR<FirstBankNameResponse>('/user/bank/first', get)

  const useActivityList = () => useSWR<ActivityListResponse>('/activity', get)

  const useActivity = (id: number) =>
    useSWR<ActivityResponse>(id && `/activity/${id}`, get)

  const useGoodsInfo = (id: number, lottery_id: number) =>
    useSWR<GoodInfoResponse>(
      id && lottery_id && ['/lottery/getGoods', id, lottery_id],
      (url, lottery_goods_id, lottery_id) =>
        post(url, { lottery_goods_id, lottery_id }),
    )

  const useBetSuccess = (sn: string) =>
    useSWR<BetSuccessResponse>(
      sn && ['/lottery/betSuccess', sn],
      (url, order_sn) => post(url, { order_sn }),
    )

  const useFinanceRec = (start: string, end: string) =>
    useSWR<FinanceRecResponse>(
      start && end && ['/finance/record', start, end],
      (url, created_at1, created_at2) =>
        post(url, { created_at1, created_at2 }),
    )

  const useRechargeLog = (start: string, end: string) =>
    useSWR<RechargeLogResponse>(
      start && end && ['/finance/rechargeLog', start, end],
      (url, created_at1, created_at2) =>
        post(url, { created_at1, created_at2 }),
    )
  const useWithdrawLog = (start: string, end: string) =>
    useSWR<WithdrawLogResponse>(
      start && end && ['/finance/withdrawLog', start, end],
      (url, created_at1, created_at2) =>
        post(url, { created_at1, created_at2 }),
    )
  const useFaqList = () =>
    useSWR<NoticeListResponse>('/noticelist', (url) => post(url, { type: 2 }))

  const useNewsList = () =>
    useSWR<NoticeListResponse>('/noticelist', (url) =>
      post(url, { type: [1, 3] }),
    )

  return {
    useCaptcha,
    doLogin,
    useLotteryList,
    useGoodsList,
    useCurrentQishu,
    useUserProfile,
    useOpenedRec,
    useBetRec,
    useLeaderBoard,
    useActivityList,
    useActivity,
    useBankCardList,
    useBankList,
    useFirstBankName,
    doCreateBankCard,
    useGoodsInfo,
    doBetConfirm,
    doBetAction,
    useBetSuccess,
    useWanfaList,
    useFinanceRec,
    useRechargeLog,
    useWithdrawLog,
    useFaqList,
    useNewsList,
    checkLoginStatus,
    doLogout,
  }
}

export default useService
