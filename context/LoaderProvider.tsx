import React, { createContext, useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'

type ContextState = {
  isLoading: boolean
  loadingStart: () => void
  loadingEnd: () => void
}

const LoaderContext = createContext<ContextState>(null)

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const loadingStart = () => setLoading(true)
  const loadingEnd = () => setLoading(false)
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        loadingStart,
        loadingEnd,
      }}
    >
      {children}
      <Modal
        show={isLoading}
        onHide={() => {}}
        backdrop={false}
        className="loader"
        contentClassName="bg-transparent"
      >
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Modal>
    </LoaderContext.Provider>
  )
}

export const useLoaderProvider = () => useContext(LoaderContext)

export default LoaderProvider
