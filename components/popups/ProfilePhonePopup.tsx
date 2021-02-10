import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { useToast } from '@chakra-ui/toast'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'
import FieldValidateMessage from '../FieldValidateMessage'
import useHelper from '@/utils/useHelper'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#tel-edit').addClass('slide-up')
}

function ProfilePhonePopup() {
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    mobile: string
  }>()
  const API = useRequest()
  const toast = useToast()
  const { closeBottomPopup } = useHelper()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact({ ...userContact, ...d })
      toast({ status: 'success', title: '更新成功' })
      closeBottomPopup()
      reset()
      fetchUserContact()
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  useEffect(() => {
    $('.tel').on('click', jqEffectFunc)
    return () => {
      $('.tel').off()
    }
  }, [])
  return (
    <BottomPopup title="手机号码" id="tel-edit" onClose={reset}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">手机号码</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            name="mobile"
            ref={register({ required: '不可為空' })}
            defaultValue={userContact?.mobile}
          />
          <FieldValidateMessage error={errors.mobile} />
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfilePhonePopup
