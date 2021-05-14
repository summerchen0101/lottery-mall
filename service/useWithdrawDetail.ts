import useRequest from '@/utils/useRequest'
import useSWR from 'swr'

interface WithdrawDetailRes {
  success: boolean
  data: {
    name: string
    bank: string
    bank_name: string
    account: string
    order_sn: string
    money: string
    real_money: string
    created_at: string
  }
}

export default function useWithdrawDetail(id: number) {
  const { post } = useRequest()
  const { data: res, error, mutate, isValidating } = useSWR<WithdrawDetailRes>(
    id && ['/finance/withdrawDetail', id],
    (url, withdraw_id) => post(url, { withdraw_id }),
  )
  return {
    info: res?.data,
    isLoading: !error && !res,
    isError: error,
    refresh: mutate,
  }
}
