import { useRouter } from 'next/dist/client/router'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from './useRequest'
import { useCallback, useState } from 'react'
import {
  Banner,
  DateRangeListRequest,
  Handicap,
  Marquee,
  Score,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'

const useService = () => {
  const [marquee, setMarquee] = useState<Marquee[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [handicaps, setHandicaps] = useState<Handicap[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const toast = useToast()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const router = useRouter()
  const { setUser } = useGlobalProvider()

  const handleSendPhoneCode = async (acc: string) => {
    if (!acc) {
      toast({ status: 'info', title: '請先填寫帳號/手機' })
      return
    }
    try {
      await API.sendSmsCode(acc)
      toast({ status: 'success', title: '已送出驗證碼' })
    } catch (err) {}
  }

  const fetchUserInfo = async () => {
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
      toast({ status: 'success', title: '登出成功！' })
    } catch (err) {}
    loadingEnd()
  }
  const fetchMarquee = useCallback(async () => {
    try {
      const { data } = await API.getMarqueeList()
      setMarquee(data.list)
    } catch (err) {}
  }, [])

  const fetchBanners = useCallback(async () => {
    try {
      const { data } = await API.getBannerList()
      setBanners(data.list)
    } catch (err) {}
  }, [])

  const fetchHandicaps = useCallback(async (req?: DateRangeListRequest) => {
    loadingStart()
    try {
      const { data } = await API.getHandicapList(req)
      setHandicaps(data.list)
    } catch (err) {}
    loadingEnd()
  }, [])

  const fetchScores = useCallback(async () => {
    loadingStart()
    try {
      const { data } = await API.getScoreList()
      setScores(data.list)
    } catch (err) {}
    loadingEnd()
  }, [])

  return {
    handleSendPhoneCode,
    doLogout,
    fetchUserInfo,
    fetchMarquee,
    fetchBanners,
    fetchHandicaps,
    fetchScores,
    banners,
    marquee,
    handicaps,
    scores,
  }
}

export default useService
