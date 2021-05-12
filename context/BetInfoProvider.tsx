import React, { createContext, ReactNode, useContext, useState } from 'react'

type StateGenarator<T> = [T, React.Dispatch<React.SetStateAction<T>>]

type ContextState = {
  goodsId: StateGenarator<number>
  odds: StateGenarator<number>
  totalPrice: StateGenarator<number>
  betting: StateGenarator<boolean>
  betConfirm: StateGenarator<boolean>
  betSuccess: StateGenarator<boolean>
}

const BetInfoContext = createContext<ContextState>(null)

export default function BetInfoProvider({ children }: { children: ReactNode }) {
  return (
    <BetInfoContext.Provider
      value={{
        goodsId: useState(null),
        odds: useState(null),
        totalPrice: useState(null),
        betting: useState(false),
        betConfirm: useState(false),
        betSuccess: useState(false),
      }}
    >
      {children}
    </BetInfoContext.Provider>
  )
}

export const useBetInfoContext = () => useContext(BetInfoContext)
