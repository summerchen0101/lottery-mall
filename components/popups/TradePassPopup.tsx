import $ from 'jquery'
import React, { useEffect } from 'react'
import BottomPopup from './BottomPopup'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#withdrawal-pw-edit').addClass('slide-up')
}

function TradePassPopup() {
  useEffect(() => {
    $('.withdrawal-pw').on('click', jqEffectFunc)
    return () => {
      $('.withdrawal-pw').off()
    }
  }, [])
  return (
    <BottomPopup title="提领密码" id="withdrawal-pw-edit">
      <form>
        <label className="form-label">当前密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input account-input"
            required
            placeholder="请输入旧密码"
          />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <label className="form-label">新密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input account-input"
            required
            placeholder="请输入确认密码"
          />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <label className="form-label">确认新密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input account-input"
            required
            placeholder="再次确认密码"
          />
          <a className="iconfont iconclear btn_cancel"></a>
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

export default TradePassPopup