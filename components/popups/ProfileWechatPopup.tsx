import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#wechat-edit').addClass('slide-up')
}

function ProfileWechatPopup() {
  useEffect(() => {
    $('.wechat').on('click', jqEffectFunc)
    return () => {
      $('.wechat').off()
    }
  }, [])
  return (
    <BottomPopup title="微信" id="wechat-edit">
      <form>
        <label className="form-label">微信帐号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="請輸入微信帐号"
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

export default ProfileWechatPopup