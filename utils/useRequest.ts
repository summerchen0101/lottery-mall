import { useLoaderProvider } from '@/context/LoaderProvider'
import errCodes from '@/lib/errCodes'
import Axios, { AxiosRequestConfig, Method } from 'axios'
import { ResponseBase } from '@/lib/types'
import useStorage from './useStorage'
import { useCallback, useMemo } from 'react'
import useErrorHandler from './useErrorHandler'

const useRequest = () => {
  const [token] = useStorage('token')
  const { apiErrHandler } = useErrorHandler()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const request = useCallback(
    async function <R>(
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
            return status >= 200 && status < 300
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          ...config,
        })
        loadingEnd()
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
