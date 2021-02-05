import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

const CountDownReloadBtn = () => {
  return (
    <button className="title-bar-btn icon_btn ml-3 reload-btn" id="">
      <i className="iconfont iconreload"></i>
      {/* <Spinner thickness="2px" /> */}
      {/* <span className="countdown">30s</span> */}
    </button>
  )
}

export default CountDownReloadBtn
