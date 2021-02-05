import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#email-edit').addClass('slide-up')
}

function ProfileEmailPopup() {
  useEffect(() => {
    $('.email').on('click', jqEffectFunc)
    return () => {
      $('.email').off()
    }
  }, [])
  return (
    <BottomPopup title="邮箱账号" id="email-edit">
      <form>
        <div className="descript">
          为了您的安全，信息在送出后将无法修改，如需帮助请
          <a href="#">联系客服</a>
        </div>
        <label className="form-label">邮箱账号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="請輸入邮箱账号"
          />
          <a className="captcha">获取验证码</a>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            required
            placeholder="请输入邮箱验证码"
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

export default ProfileEmailPopup
