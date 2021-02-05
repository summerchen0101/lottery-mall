import React, { useEffect } from 'react'
import Backdrop from '../Backdrop'
import $ from 'jquery'

function TradePassPopup() {
  useEffect(() => {
    $('.withdrawal-pw').on('click', function () {
      $('.mask').fadeIn()
      $('#withdrawal-pw-edit').addClass('slide-up')
    })
    $('.close_btn, .mask, .remove-slide').on('click', function () {
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    })
  }, [])
  return (
    <>
      {/* <Backdrop /> */}
      <div className="slide-up-section" id="withdrawal-pw-edit">
        <div className="title-col">
          提领密码
          <a className="close_btn iconfont iconclose"></a>
        </div>
        <div className="content-col modals-section-padding">
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
        </div>
      </div>
    </>
  )
}

export default TradePassPopup
