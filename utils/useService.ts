import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { usePaginationContext } from '@/context/PaginationProvider'
import {
  Banner,
  DateRangeListRequest,
  Handicap,
  Marquee,
  Score,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useState } from 'react'
import useRequest from './useRequest'

const useService = () => {
  const [marquee, setMarquee] = useState<Marquee[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [handicaps, setHandicaps] = useState<Handicap[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const { setBetSettings } = useGlobalProvider()
  const toast = useToast()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const router = useRouter()
  const {
    setUser,
    setUserContact,
    setUserIdentity,
    setBankcardOpts,
    setBankcards,
  } = useGlobalProvider()
  const { setTotalCount, setTotalPages, setPage } = usePaginationContext()

  const applyActivity = async (id: number) => {
    loadingStart()
    try {
      await API.applyActivity(id)
      toast({ duration: 2000, status: 'success', title: '申請已送出' })
    } catch (err) {}
    loadingEnd()
  }

  const fetchBankCardOpts = async () => {
    try {
      const res = await API.getMemberBankOptions()
      setBankcardOpts(res.data.list)
    } catch (err) {}
  }
  const handleSendPhoneCode = async (acc: string) => {
    if (!acc) {
      toast({ duration: 2000, status: 'info', title: '請先填寫帳號/手機' })
      return
    }
    try {
      await API.sendSmsCode(acc)
      toast({ duration: 2000, status: 'success', title: '已送出驗證碼' })
    } catch (err) {}
  }

  const fetchUserContact = async () => {
    try {
      const res = await API.getUserContact()
      setUserContact(res.data)
    } catch (err) {}
  }
  const fetchUserIdentity = async () => {
    try {
      const res = await API.getUserIdentity()
      setUserIdentity(res.data)
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
      toast({ duration: 2000, status: 'success', title: '登出成功！' })
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

  const fetchMemberBankList = async () => {
    loadingStart()
    try {
      const res = await API.getMemberBankList()
      setBankcards(res.data.list)
    } catch (err) {}
    loadingEnd()
  }

  const fetchBetSettings = async (section_code: string) => {
    try {
      const res = await API.betSettings({
        game_code: 'SC',
        section_code,
        play_code: 'NCS',
      })
      setBetSettings(res.data.list?.[0])
    } catch (err) {}
  }

  const fetchHandicaps = useCallback(async (req?: DateRangeListRequest) => {
    loadingStart()
    try {
      const { data } = await API.getHandicapList(req)
      setHandicaps(data.list)
      setTotalPages(data.total_page)
      setTotalCount(data.total_count)
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
    fetchUserContact,
    fetchUserIdentity,
    fetchBankCardOpts,
    fetchMemberBankList,
    applyActivity,
    fetchBetSettings,
    banners,
    marquee,
    handicaps,
    scores,
  }
}

export default useService
