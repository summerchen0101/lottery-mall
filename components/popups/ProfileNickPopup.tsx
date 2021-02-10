import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import FieldValidateMessage from '../FieldValidateMessage'
import { useToast } from '@chakra-ui/toast'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#nickname-edit').addClass('slide-up')
}

function ProfileNickPopup() {
  const { register, handleSubmit, errors, reset } = useForm<{ name: string }>()
  const API = useRequest()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact(d)
      toast({ status: 'success', title: '更新成功' })
      reset()
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  useEffect(() => {
    $('.nickname').on('click', jqEffectFunc)
    return () => {
      $('.nickname').off()
    }
  }, [])
  return (
    <BottomPopup title="昵称修改" id="nickname-edit">
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">昵称</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            placeholder="請輸入昵称"
            name="name"
            ref={register({ required: '不可為空' })}
          />
          <FieldValidateMessage error={errors.name} />
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfileNickPopup
