import { useGlobalProvider } from '@/context/GlobalProvider'
import useTransfer from '@/utils/useTransfer'
import React from 'react'

// type UserBalanceProps = {
//   balance: number
// }
function UserBalance() {
  const { user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  return (
    <span className="user-wallet">
      ¥ {user?.balance ? toCurrency(user?.balance) : 0}
    </span>
  )
}

export default UserBalance
