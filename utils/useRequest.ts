import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import Axios, { AxiosRequestConfig, Method } from 'axios'
import { useCallback } from 'react'
import useErrorHandler from './useErrorHandler'
import useStorage from './useStorage'

const useRequest = () => {
  const { token } = useGlobalProvider()
  const { apiErrHandler } = useErrorHandler()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const request = useCallback(
    async function <R extends { success?: boolean; message?: string }>(
      method: Method,
      url: string,
      data: any,
      config?: AxiosRequestConfig,
    ) {
      loadingStart()
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
            Authorization: `Bearer ${token}`,
          },
          ...config,
        })
        loadingEnd()
        if (res.data.success === false) {
          throw Error(res.data?.message || '错误发生')
        }
        return res.data
      } catch (err) {
        apiErrHandler(err)
      }
      loadingEnd()
      return null
    },
    [token],
  )

  const get = function <R>(url: string, params?: any) {
    return request<R>('get', url, null, { params })
  }
  const post = function <R>(url: string, data?: any) {
    return request<R>('post', url, data)
  }

  return {
    get,
    post,
    request,
  }
}

export default useRequest
