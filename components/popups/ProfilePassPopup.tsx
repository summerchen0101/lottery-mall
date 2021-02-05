import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#login-pw-edit').addClass('slide-up')
}

function ProfilePassPopup() {
  useEffect(() => {
    $('.login-pw').on('click', jqEffectFunc)
    return () => {
      $('.login-pw').off()
    }
  }, [])
  return (
    <BottomPopup title="密码修改" id="login-pw-edit">
      <form>
        <label className="form-label">当前密码</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="请输入旧密码"
          />
          <a className="iconfont iconclear btn_cancel" />
        </div>
        <label className="form-label">新密码</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="请输入确认密码"
          />
          <a className="iconfont iconclear btn_cancel" />
        </div>
        <label className="form-label">确认新密码</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="再次确认密码"
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

export default ProfilePassPopup
