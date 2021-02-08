import { useGlobalProvider } from '@/context/GlobalProvider'
import useTransfer from '@/utils/useTransfer'
import React from 'react'

// type UserBalanceProps = {
//   balance: number
// }
function UserBalance() {
  const { userBalance } = useGlobalProvider()
  return <span className="user-wallet">¥ {userBalance}</span>
}

export default UserBalance
