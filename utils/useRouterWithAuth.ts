import useCheckLogin from '@/service/useCheckLogin'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'

export default function useRouterWithAuth() {
  const { isLogin } = useCheckLogin()
  const router = useRouter()
  const toast = useToast()
  const authPush = async (path: string) => {
    if (!isLogin) {
      await router.push({ pathname: '/login', query: { to: path } })
      toast({ status: 'warning', title: '請先登入' })
    } else {
      router.push(path)
    }
  }
  return { authPush }
}
