import { useGlobalProvider } from '@/context/GlobalProvider'
import useTransfer from '@/utils/useTransfer'
import React from 'react'

// type UserBalanceProps = {
//   balance: number
// }
function UserBalance() {
  const { user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  return <span className="user-wallet">¥ {toCurrency(user?.balance, 2)}</span>
}

export default UserBalance
