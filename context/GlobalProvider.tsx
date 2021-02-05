import React, { createContext, useContext, useState } from 'react'
import { UserInfo } from '@/lib/types'

type ContextState = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null)
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
