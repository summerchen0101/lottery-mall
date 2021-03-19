import { Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Fade } from '@chakra-ui/transition'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  isLoading: boolean
  loadingStart: () => void
  loadingEnd: () => void
  loadingSpinner: JSX.Element
}

const LoaderContext = createContext<ContextState>(null)

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const loadingStart = () => setLoading(true)
  const loadingEnd = () => setLoading(false)
  const loadingSpinner = (
    <Fade in={isLoading} unmountOnExit>
      <Center p="40px" h="full" w="full" pos="fixed" top="0" zIndex="99">
        <Spinner size="xl" color="rgba(0,0,0,0.3)" thickness="3px" />
      </Center>
    </Fade>
  )
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        loadingStart,
        loadingEnd,
        loadingSpinner,
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoaderProvider = () => useContext(LoaderContext)

export default LoaderProvider
