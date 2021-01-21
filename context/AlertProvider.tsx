import React, { createContext, useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'

type ContextState = {
  visible: boolean
  showAlert: (msg: string) => void
}

const AlertContext = createContext<ContextState>(null)

const AlertProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState('')

  const showAlert = (msg: string) => {
    setContent(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 1000)
  }
  return (
    <AlertContext.Provider
      value={{
        visible,
        showAlert,
      }}
    >
      {children}
      <Modal show={visible} onHide={() => setVisible(false)} backdrop={false}>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </AlertContext.Provider>
  )
}

export const useAlertProvider = () => useContext(AlertContext)

export default AlertProvider
