import {
  EditPassRequest,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  UserProfileResponse,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import useRequest from './useRequest'

function useService() {
  const toast = useToast()
  const { post, get, request } = useRequest()

  const checkLoginStatus = () => post<UserProfileResponse>('/user/profile')

  const doLogin = (req: LoginRequest) => post<LoginResponse>('/login', req)

  const doLogout = () => post<LogoutResponse>('/logout')

  const doEditPass = (req: EditPassRequest) =>
    post<{ success: boolean }>('/user/editpwd', req)

  return {
    doLogin,
    checkLoginStatus,
    doLogout,
    doEditPass,
  }
}

export default useService
