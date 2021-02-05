import React from 'react'
import Backdrop from './Backdrop'
import MetaHead from './MetaHead'
import DatePickerPopup from './popups/DatePickerPopup'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MetaHead />
      {children}
      <Backdrop />
      <DatePickerPopup />
    </>
  )
}

export default Layout
