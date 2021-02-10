import $ from 'jquery'
import React, { ReactNode, useCallback, useEffect } from 'react'

type ButtonPopupProps = {
  id?: string
  title?: string
  children?: ReactNode
  onClear: () => void
}

function BottomPopup({ title, children, id, onClear }: ButtonPopupProps) {
  const jqEffectFunc = useCallback(function () {
    $('.mask').fadeOut()
    $('.slide-up-section').removeClass('slide-up')
    onClear && onClear()
  }, [])
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
