import { useRouter } from 'next/dist/client/router'
import { useAlertProvider } from '@/context/AlertProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from './useRequest'

const useService = () => {
  const { showAlert } = useAlertProvider()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const router = useRouter()
  const { setUser } = useGlobalProvider()
  const handleSendPhoneCode = async (acc: string) => {
    if (!acc) {
      showAlert('請先填寫帳號/手機')
      return
    }
    try {
      await API.sendSmsCode(acc)
      showAlert('已送出驗證碼')
    } catch (err) {
      showAlert(err.message)
    }
  }

  const getUserInfo = async () => {
    try {
      const res = await API.getUserInfo()
      setUser(res.data)
    } catch (err) {}
  }

  const doLogout = async () => {
    loadingStart()
    try {
      await API.logout()
      await router.push('/login')
      setUser(null)
      showAlert('登出成功！')
    } catch (err) {}
    loadingEnd()
  }

  return {
    handleSendPhoneCode,
    doLogout,
    getUserInfo,
  }
}

export default useService
