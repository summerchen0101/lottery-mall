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
  $('#qq-edit').addClass('slide-up')
}
function ProfileQqPopup() {
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    qq_id: string
  }>()
  const API = useRequest()
  const toast = useToast()
  const { closeBottomPopup } = useHelper()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact({ ...userContact, ...d })
      toast({ duration: 2000, status: 'success', title: '更新成功' })
      closeBottomPopup()
      reset()
      fetchUserContact()
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  useEffect(() => {
    $('.qq').on('click', jqEffectFunc)
    return () => {
      $('.qq').off()
    }
  }, [])
  return (
    <BottomPopup title="QQ" id="qq-edit" onClose={reset}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">QQ帐号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            placeholder="请输入QQ帐号"
            name="qq_id"
            ref={register({ required: '不可为空' })}
            defaultValue={userContact?.qq_id}
          />
          <FieldValidateMessage error={errors.qq_id} />
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfileQqPopup
