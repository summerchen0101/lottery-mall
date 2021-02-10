import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { useToast } from '@chakra-ui/toast'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'
import FieldValidateMessage from '../FieldValidateMessage'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#line-edit').addClass('slide-up')
}
function ProfileLinePopup() {
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    line_id: string
  }>()
  const API = useRequest()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact({ ...userContact, ...d })
      toast({ status: 'success', title: '更新成功' })
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  const onClose = () => {
    reset()
    fetchUserContact()
  }
  useEffect(() => {
    $('.line').on('click', jqEffectFunc)
    return () => {
      $('.line').off()
    }
  }, [])
  return (
    <BottomPopup title="Line" id="line-edit" onClose={onClose}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">Line帐号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            placeholder="請輸入Line帐号"
            name="line_id"
            ref={register({ required: '不可為空' })}
            defaultValue={userContact?.line_id}
          />
          <FieldValidateMessage error={errors.line_id} />
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfileLinePopup
