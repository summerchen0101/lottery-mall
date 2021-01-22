import React from 'react'
import MetaHead from './MetaHead'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MetaHead />
      {children}
    </>
  )
}

export default Layout
