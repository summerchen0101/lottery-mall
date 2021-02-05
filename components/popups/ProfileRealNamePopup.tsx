import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#name-edit').addClass('slide-up')
}

function ProfileRealNamePopup() {
  useEffect(() => {
    $('.name').on('click', jqEffectFunc)
    return () => {
      $('.name').off()
    }
  }, [])
  return (
    <BottomPopup title="真实姓名" id="name-edit">
      <form>
        <label className="form-label">真实姓名</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="請輸入真实姓名"
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

export default ProfileRealNamePopup
