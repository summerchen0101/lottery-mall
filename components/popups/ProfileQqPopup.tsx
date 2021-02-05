import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#qq-edit').addClass('slide-up')
}

function ProfileQqPopup() {
  useEffect(() => {
    $('.qq').on('click', jqEffectFunc)
    return () => {
      $('.qq').off()
    }
  }, [])
  return (
    <BottomPopup title="QQ" id="qq-edit">
      <form>
        <label className="form-label">QQ帐号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="請輸入QQ帐号"
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

export default ProfileQqPopup
