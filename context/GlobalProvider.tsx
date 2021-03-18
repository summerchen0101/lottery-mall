import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
