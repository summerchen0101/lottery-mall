import $ from 'jquery'
import React, { ReactNode, useEffect } from 'react'

type ButtonPopupProps = {
  id?: string
  title?: string
  children?: ReactNode
}
const jqEffectFunc = function () {
  $('.mask').fadeOut()
  $('.slide-up-section').removeClass('slide-up')
}
function BottomPopup({ title, children, id }: ButtonPopupProps) {
  useEffect(() => {
    $('.close_btn, .mask, .remove-slide').on('click', jqEffectFunc)
    return () => {
      $('.close_btn, .mask, .remove-slide').off()
    }
  }, [])
  return (
    <div className="slide-up-section" id={id}>
      <div className="title-col">
        {title}
        <a className="close_btn iconfont iconclose"></a>
      </div>
      <div className="content-col modals-section-padding">{children}</div>
    </div>
  )
}

export default BottomPopup
