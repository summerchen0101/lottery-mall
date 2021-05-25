import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface RechargeDetailRes {
  success: boolean
  data: {
    order_sn: string
    self_name: string
    self_bank: string
    bank: string
    name: string
    bank_name: string
    account: string
    qrcode: string
    money: string
    rate: string
    real_money: string
    remark: string
    created_at: string
  }
}

export default function useRechargeDetail(id: number) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<RechargeDetailRes>(
    id && ['/finance/rechargeDetail', id],
    (url, recharge_id) => post(url, { recharge_id }),
  )
  return {
    info: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
