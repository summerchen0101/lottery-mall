import Axios, { AxiosRequestConfig } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'
import { useAlertProvider } from '@/context/AlertProvider'
import errCodes from '@/lib/errCodes'
import {
  BaseListRequest,
  BaseListResponse,
  CheckLoginResponseData,
  LoginRequest,
  LoginResponse,
  Marquee,
  News,
  NewsDetail,
  PwUpdateRequest,
  RegisterRequest,
  ResponseBase,
  UserInfo,
  CaptchaResponse,
  Banner,
  Activity,
  ActivityDetail,
  Faq,
  MemberBank,
  OptionBasic,
  MemberBankCreateRequest,
  Message,
} from '@/lib/types'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useToast } from '@chakra-ui/toast'

const useRequest = () => {
  const router = useRouter()
  const { token } = useGlobalProvider()
  const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: process.env.apiBaseUrl,
    validateStatus: (status) => {
      return true
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const AxiosInstance = Axios.create(config)
  const toast = useToast()
  AxiosInstance.interceptors.response.use((res) => {
    let errorMsg = ''
    if (res.data.code) {
      errorMsg = errCodes[res.data.code]
    } else if (res.status === 401) {
      router.push('/login')
      errorMsg = httpStatus[401]
    } else if (res.status === 500) {
      errorMsg = '系統錯誤'
    } else if (res.data.error) {
      errorMsg = '操作錯誤'
    }
    if (errorMsg) {
      toast({ status: 'error', title: errorMsg })
      throw new Error(errorMsg)
    }
    return res.data
  })
  const get = function <T>(
    url: string,
    params = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.get(url, { params })
  }
  const post = async function <T>(
    url: string,
    data = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.post(url, data)
  }

  const getNewsList = (req?: BaseListRequest) =>
    post<BaseListResponse<News>>('news/list', { page: 1, perpage: 100, ...req })

  const getNewsDetail = (id: number) => get<NewsDetail>(`news/view/${id}`)

  const getActivityList = (req?: BaseListRequest) =>
    post<BaseListResponse<Activity>>('activity/list', {
      page: 1,
      perpage: 100,
      ...req,
    })

  const getActivityDetail = (id: number) =>
    get<ActivityDetail>(`activity/view/${id}`)

  const getFaqList = (req?: BaseListRequest) =>
    post<BaseListResponse<Faq>>('qa/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const getMarqueeList = () =>
    post<BaseListResponse<Marquee>>('marquee/list', { page: 1, perpage: 100 })

  const getBannerList = () =>
    post<BaseListResponse<Banner>>('banner/list', { page: 1, perpage: 100 })

  const getMessageList = () =>
    post<BaseListResponse<Message>>('inbox_message/list', {
      page: 1,
      perpage: 100,
    })

  const getMemberBankList = (req?: BaseListRequest) =>
    post<BaseListResponse<MemberBank>>('member_bank/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const getMemberBankOptions = () =>
    post<BaseListResponse<OptionBasic>>('member_bank/options', {
      page: 1,
      perpage: 100,
    })
  const setDefaultMemberBank = (id: number) =>
    post<null>('member_bank/default', {
      id,
      is_active: true,
    })
  const removeMemberBank = (id: number) =>
    post<null>('member_bank/remove', { id })

  const createMemberBank = (req: MemberBankCreateRequest) =>
    post<null>('member_bank/add', {
      page: 1,
      perpage: 100,
      ...req,
    })

  const checkLogin = () => get<CheckLoginResponseData>('check_login')
  const getCaptcha = () => get<CaptchaResponse>('captcha')

  const updatePw = (req: PwUpdateRequest) => post<null>('member/pass')
  const updateTradePw = (req: PwUpdateRequest) => post<null>('member/sec_pass')
  const checkAcc = (acc: string) => post<null>('check_acc', { acc })
  const checkName = (name: string) => post<null>('check_name', { name })
  const sendSmsCode = (mobile: string) => post<null>('sms_code', { mobile })
  const register = (req: RegisterRequest) =>
    post<{ token: string }>('register', req)
  const login = (req: LoginRequest) => post<LoginResponse>('login', req)
  const logout = () => get<null>('logout')

  const getUserInfo = () => get<UserInfo>('member/view')

  return {
    getUserInfo,
    getMemberBankList,
    getMemberBankOptions,
    createMemberBank,
    setDefaultMemberBank,
    removeMemberBank,
    getMessageList,
    getNewsList,
    getNewsDetail,
    getActivityList,
    getActivityDetail,
    getMarqueeList,
    getBannerList,
    getFaqList,
    checkLogin,
    getCaptcha,
    updatePw,
    updateTradePw,
    checkAcc,
    checkName,
    sendSmsCode,
    register,
    login,
    logout,
  }
}

export default useRequest
