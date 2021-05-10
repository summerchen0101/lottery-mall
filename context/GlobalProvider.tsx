import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  orderSn: string
  setOrderSn: React.Dispatch<React.SetStateAction<string>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [orderSn, setOrderSn] = useState('')
  const [token, setToken] = useStorage('token', '')
  return (
    <GlobalContext.Provider
      value={{
        orderSn,
        setOrderSn,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
