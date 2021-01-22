import React, { useEffect } from 'react'

const Marquee: React.FC = ({ children }) => {
  return (
    <div className="marquee-box">
      <p>{children}</p>
    </div>
  )
}

export default Marquee
