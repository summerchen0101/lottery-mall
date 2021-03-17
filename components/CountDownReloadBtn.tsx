import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

interface CountDownReloadBtnProps {
  onClick?: () => void
  isLoading?: boolean
}

const CountDownReloadBtn = ({
  onClick,
  isLoading,
}: CountDownReloadBtnProps) => {
  return (
    <button
      className="title-bar-btn icon_btn ml-3 reload-btn"
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : <i className="iconfont iconreload"></i>}
      {/* <Spinner thickness="2px" /> */}
      {/* <span className="countdown">30s</span> */}
    </button>
  )
}

export default CountDownReloadBtn
