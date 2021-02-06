import React, { createContext, useContext, useState } from 'react'
import { UserInfo } from '@/lib/types'

type ContextState = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null)
  const [token, setToken] = useState<string>('')
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
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
