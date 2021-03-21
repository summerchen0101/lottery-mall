import BettingSuccessPopup from '@/components/BettingSuccessPopup'
import React, { createContext, useContext, useState } from 'react'

type PopupProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface IState {
  betting: PopupProps<boolean>
  betConfirm: PopupProps<boolean>
  betSuccess: PopupProps<boolean>
}

const PopupContext = createContext<IState | null>(null)

const PopupProvider: React.FC = ({ children }) => {
  const initialState: IState = {
    betting: useState(false),
    betConfirm: useState(false),
    betSuccess: useState(false),
  }
  return (
    <PopupContext.Provider value={initialState}>
      {children}
      <BettingSuccessPopup />
    </PopupContext.Provider>
  )
}

export default PopupProvider

export const usePopupContext = (popupName: keyof IState) => {
  const state = useContext(PopupContext)
  return state[popupName]
}
