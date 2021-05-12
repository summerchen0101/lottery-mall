import BettingSuccessPopup from '@/components/BettingSuccessPopup'
import React, { createContext, useContext, useState } from 'react'

type PopupProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface IState {
  betting: PopupProps<boolean>
  betConfirm: PopupProps<boolean>
  betSuccess: PopupProps<boolean>
  rechargeLog: PopupProps<boolean>
  withdrawLog: PopupProps<boolean>
}

const PopupContext = createContext<IState | null>(null)

const PopupProvider: React.FC = ({ children }) => {
  const initialState: IState = {
    betting: useState(false),
    betConfirm: useState(false),
    betSuccess: useState(false),
    rechargeLog: useState(false),
    withdrawLog: useState(false),
  }
  return (
    <PopupContext.Provider value={initialState}>
      {children}
    </PopupContext.Provider>
  )
}

export default PopupProvider

export const usePopupContext = (popupName: keyof IState) => {
  const state = useContext(PopupContext)
  return state[popupName]
}
