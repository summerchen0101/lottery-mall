import {
  BankCardCreateRequest,
  BetConfirmRequest,
  BetConfirmResponse,
  EditPassRequest,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  UserProfileResponse,
  WithdrawCreateRequest,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
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

  const doEditPass = (req: EditPassRequest) =>
    post<{ success: boolean }>('/user/editpwd', req)

  return {
    doLogin,
    doCreateBankCard,
    doCreateWithdraw,
    checkLoginStatus,
    doLogout,
    doEditPass,
  }
}

export default useService
