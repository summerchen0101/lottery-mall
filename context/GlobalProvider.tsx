import React, { createContext, useContext, useState } from 'react'
import { Handicap, Odds, UserInfo } from '@/lib/types'
import useStorage from '@/utils/useStorage'

type ContextState = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  bettingInfo: Odds
  setBettingInfo: React.Dispatch<React.SetStateAction<Odds>>
  eventInfo: Handicap
  setEventInfo: React.Dispatch<React.SetStateAction<Handicap>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null)
  const [token, setToken] = useStorage<string>('token', '')
  const [bettingInfo, setBettingInfo] = useState<Odds>(null)
  const [eventInfo, setEventInfo] = useStorage<Handicap>('event', null)
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        bettingInfo,
        setBettingInfo,
        eventInfo,
        setEventInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
