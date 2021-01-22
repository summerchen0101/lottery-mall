import React from 'react'

const TabGroup: React.FC = ({ children }) => {
  return (
    <ul
      className="nav nav-tabs d-flex justify-content-between section-padding"
      role="tablist"
    >
      {children}
    </ul>
  )
}

export default TabGroup
