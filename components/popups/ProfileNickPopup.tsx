import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#nickname-edit').addClass('slide-up')
}

function ProfileNickPopup() {
  useEffect(() => {
    $('.nickname').on('click', jqEffectFunc)
    return () => {
      $('.nickname').off()
    }
  }, [])
  return (
    <BottomPopup title="昵称修改" id="nickname-edit">
      <form>
        <label className="form-label">昵称</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="請輸入昵称"
          />
          <a className="iconfont iconclear btn_cancel" />
        </div>
        <button
          type="submit"
          className="btnbase primary_btn mt-4 mb-2 remove-slide"
        >
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfileNickPopup
