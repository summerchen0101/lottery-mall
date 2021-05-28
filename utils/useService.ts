import {
  ActivityListResponse,
  ActivityResponse,
  BankCardCreateRequest,
  BankListResponse,
  BetActionRequest,
  BetActionResponse,
  BetConfirmRequest,
  BetConfirmResponse,
  BetSuccessResponse,
  EditPassRequest,
  FinanceRecResponse,
  FirstBankNameResponse,
  LeaderBoardResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  NoticeListResponse,
  RechargeLogResponse,
  UserProfileResponse,
  WithdrawCreateRequest,
  WithdrawLogResponse,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import useSWR from 'swr'
import useRequest from './useRequest'

function useService() {
  const toast = useToast()
  const { post, get, request } = useRequest()

  const checkLoginStatus = () => post<UserProfileResponse>('/user/profile')

  const doLogin = (req: LoginRequest) => post<LoginResponse>('/login', req)

  const doLogout = () => post<LogoutResponse>('/logout')

  const doCreateBankCard = (req: BankCardCreateRequest) =>
    post<null>('/user/bankCreate', req)

  const doCreateWithdraw = (req: WithdrawCreateRequest) =>
    post<{ success: boolean; data: number }>('/finance/withdraw', req)

  const doBetConfirm = (req: BetConfirmRequest) =>
    post<BetConfirmResponse>('/lottery/betConfirm', req)

  const doBetAction = (req: BetActionRequest) =>
    post<BetActionResponse>('/lottery/betAction', req)

  const doEditPass = (req: EditPassRequest) =>
    post<{ success: boolean }>('/user/editpwd', req)

  return {
    doLogin,
    doCreateBankCard,
    doCreateWithdraw,
    doBetConfirm,
    doBetAction,
    checkLoginStatus,
    doLogout,
    doEditPass,
  }
}

export default useService
