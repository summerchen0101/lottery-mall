import {
  BetSetting,
  Handicap,
  MemberBank,
  MemberBankOption,
  Odds,
  UserContact,
  UserIdentity,
  UserInfo,
} from '@/lib/types'
import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
  userContact: UserContact
  setUserContact: React.Dispatch<React.SetStateAction<UserContact>>
  userIdentity: UserIdentity
  setUserIdentity: React.Dispatch<React.SetStateAction<UserIdentity>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  bettingInfo: Odds
  setBettingInfo: React.Dispatch<React.SetStateAction<Odds>>
  eventInfo: Handicap
  setEventInfo: React.Dispatch<React.SetStateAction<Handicap>>
  bankcardOpts: MemberBankOption[]
  setBankcardOpts: React.Dispatch<React.SetStateAction<MemberBankOption[]>>
  bankcards: MemberBank[]
  setBankcards: React.Dispatch<React.SetStateAction<MemberBank[]>>
  betSettings: BetSetting
  setBetSettings: React.Dispatch<React.SetStateAction<BetSetting>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null)
  const [bankcardOpts, setBankcardOpts] = useState<MemberBankOption[]>([])
  const [bankcards, setBankcards] = useState<MemberBank[]>([])
  const [userContact, setUserContact] = useState<UserContact>(null)
  const [userIdentity, setUserIdentity] = useState<UserIdentity>(null)
  const [token, setToken] = useStorage<string>('token', '')
  const [bettingInfo, setBettingInfo] = useState<Odds>(null)
  const [betSettings, setBetSettings] = useState<BetSetting>(null)
  const [eventInfo, setEventInfo] = useStorage<Handicap>('event', null)
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        userContact,
        setUserContact,
        userIdentity,
        setUserIdentity,
        token,
        setToken,
        bettingInfo,
        setBettingInfo,
        eventInfo,
        setEventInfo,
        bankcardOpts,
        setBankcardOpts,
        bankcards,
        setBankcards,
        betSettings,
        setBetSettings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
