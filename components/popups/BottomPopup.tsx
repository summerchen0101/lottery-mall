import useHelper from '@/utils/useHelper'
import $ from 'jquery'
import React, { ReactNode, useCallback, useEffect } from 'react'

type ButtonPopupProps = {
  id?: string
  title?: string
  children?: ReactNode
  onClose?: () => void
}

function BottomPopup({ title, children, id, onClose }: ButtonPopupProps) {
  const { closeBottomPopup } = useHelper()
  const jqEffectFunc = useCallback(function () {
    onClose && onClose()
    closeBottomPopup()
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
