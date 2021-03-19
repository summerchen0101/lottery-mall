import { useGlobalProvider } from '@/context/GlobalProvider'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'
import { useCallback } from 'react'
import useStorage from './useStorage'

function useErrorHandler() {
  const toast = useToast()
  const router = useRouter()
  const [, setToken] = useStorage('token')
  const apiErrHandler = useCallback((error: AxiosError<any>) => {
    if (error.response) {
      // 错误来自回传参数
      if (error.response.status === 401) {
        router.push({ pathname: '/login', query: { from: router.asPath } })
        setToken('')
      } else {
        toast({ title: httpStatus[error.response.status], status: 'error' })
      }
    } else if (error.request) {
      // 错误来自请求参数
      console.log(error.request)
    } else {
      // 错误来自其他因素
      toast({ title: error.message, status: 'error' })
    }
    // console.log(error.config)
  }, [])
  return {
    apiErrHandler,
  }
}

export default useErrorHandler
