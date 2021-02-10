import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import useRequest from '@/utils/useRequest'
import { useToast } from '@chakra-ui/toast'
import { useForm } from 'react-hook-form'
import FieldValidateMessage from '../FieldValidateMessage'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#name-edit').addClass('slide-up')
}

function ProfileRealNamePopup() {
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{ name: string }>()
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
    $('.name').on('click', jqEffectFunc)
    return () => {
      $('.name').off()
    }
  }, [])
  return (
    <BottomPopup title="真实姓名" id="name-edit" onClose={onClose}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">真实姓名</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            placeholder="請輸入真实姓名"
            name="name"
            ref={register({ required: '不可為空' })}
            defaultValue={userContact?.name}
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

export default ProfileRealNamePopup
