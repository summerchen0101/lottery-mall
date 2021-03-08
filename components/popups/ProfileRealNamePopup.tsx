import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import useRequest from '@/utils/useRequest'
import { useToast } from '@chakra-ui/toast'
import { useForm } from 'react-hook-form'
import FieldValidateMessage from '../FieldValidateMessage'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useHelper from '@/utils/useHelper'
import ImageUpload from '../ImageUpload'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#name-edit').addClass('slide-up')
}

function ProfileRealNamePopup() {
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    name: string
    id_card_num: string
    id_card_img: string
  }>()
  const API = useRequest()
  const toast = useToast()
  const { closeBottomPopup, getBase64 } = useHelper()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact({
        ...userContact,
        name: d.name,
        id_card_num: d.id_card_num,
        id_card_img: await getBase64(d.id_card_img[0]),
      })
      toast({ status: 'success', title: '更新成功' })
      closeBottomPopup()
      reset()
      fetchUserContact()
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  useEffect(() => {
    $('.name').on('click', jqEffectFunc)
    return () => {
      $('.name').off()
    }
  }, [])
  return (
    <BottomPopup title="實名認證" id="name-edit" onClose={reset}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">實名認證</label>
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
        <label className="form-label">身分證號</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input account-input"
            placeholder="請輸入身分證號"
            name="id_card_num"
            ref={register({ required: '不可為空' })}
            defaultValue={userContact?.id_card_num}
          />
          <FieldValidateMessage error={errors.id_card_num} />
        </div>
        <label className="form-label">照片上传</label>
        <ImageUpload
          ref={register({ required: '不可為空' })}
          name="id_card_img"
          defaultValue={userContact?.id_card_img}
        />
        <FieldValidateMessage error={errors.id_card_img} />
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfileRealNamePopup
