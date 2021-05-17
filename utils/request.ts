import Axios, { AxiosRequestConfig } from 'axios'
import { session } from 'store2'

const config: AxiosRequestConfig = {
  baseURL: '/api',
  validateStatus: function (status) {
    return true
  },
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
}
const AxiosInstance = Axios.create(config)
AxiosInstance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${session.get('token')}`
  return req
})
AxiosInstance.interceptors.response.use((res) => {
  let errorMsg = ''
  if (res.status === 401) {
    // router.push('/login')
    location.href = '/login'
    errorMsg = '请重新登录'
  } else if (res.data.success === false) {
    errorMsg = res.data.message
  } else if (res.status === 500) {
    errorMsg = '系统错误'
  } else if (res.data.error) {
    errorMsg = '操作错误'
  }
  if (errorMsg) {
    // toast({ duration: 2000, status: 'error', title: errorMsg })
    throw new Error(errorMsg)
  }
  return res.data
})
export const request = function <R>(config: AxiosRequestConfig) {
  return AxiosInstance.request(config) as Promise<R>
}
