import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#bank-card-edit').addClass('slide-up')
}

function ProfileBankCardPopup() {
  useEffect(() => {
    $('.bank-card').on('click', jqEffectFunc)
    return () => {
      $('.bank-card').off()
    }
  }, [])
  return (
    <BottomPopup title="銀行卡" id="bank-card-edit">
      <form>
        <a className="item-btn">中国工商银行 (9372)</a>
        <a className="item-btn">中国邮政 (1223)</a>
        <a className="item-btn">添加銀行卡</a>
        {/* <a className="item-btn close_btn">取消</a> */}
      </form>
    </BottomPopup>
  )
}

export default ProfileBankCardPopup
