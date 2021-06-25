import { useGlobalProvider } from '@/context/GlobalProvider'
import Axios, { AxiosRequestConfig, Method } from 'axios'
import { useCallback } from 'react'
import useErrorHandler from './useErrorHandler'

const useRequest = () => {
  const { token, setToken } = useGlobalProvider()
  const { apiErrHandler } = useErrorHandler()
  const request = useCallback(
    async function <
      R extends { success?: boolean; message?: string },
      B extends {} = {}
    >(
      method: Method,
      url: string,
      data?: B,
      config?: AxiosRequestConfig,
      showErr = true,
    ) {
      try {
        const res = await Axios.request<R>({
          method,
          url,
          data,
          baseURL: process.env.apiBaseUrl,
          validateStatus: function (status) {
            return (status >= 200 && status < 300) || status === 422
          },
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          ...config,
        })
        const newToken = res.headers.authorization?.replace('Bearer', '')
        if (newToken) {
          setToken(newToken)
          console.log(newToken)
        }
        if (res.data.success === false) {
          throw Error(res.data?.message || '错误发生')
        }
        return res.data
      } catch (err) {
        showErr && apiErrHandler(err)
      }
      return null
    },
    [token],
  )

  const get = function <R, B>(url: string, params?: B) {
    return request<R, B>('get', url, null, { params })
  }
  const post = function <R, B = {}>(url: string, data?: B, showErr = true) {
    return request<R, B>('post', url, data, null, showErr)
  }

  return {
    get,
    post,
    request,
  }
}

export default useRequest
