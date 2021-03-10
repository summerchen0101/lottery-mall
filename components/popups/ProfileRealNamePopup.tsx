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
import { Image } from '@chakra-ui/image'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#name-edit').addClass('slide-up')
}

function ProfileRealNamePopup() {
  const { fetchUserIdentity } = useService()
  const { userIdentity } = useGlobalProvider()
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
      await API.editUserIdentity({
        name: d.name,
        id_card_num: d.id_card_num,
        id_card_img: await getBase64(d.id_card_img[0]),
      })
      toast({ status: 'success', title: '更新成功' })
      closeBottomPopup()
      reset()
      fetchUserIdentity()
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
            defaultValue={userIdentity?.name}
            disabled={userIdentity?.is_confirm}
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
            defaultValue={userIdentity?.id_card_num}
            disabled={userIdentity?.is_confirm}
          />
          <FieldValidateMessage error={errors.id_card_num} />
        </div>
        <label className="form-label">照片上传</label>
        {userIdentity?.is_confirm ? (
          <Image src={userIdentity.id_card_img} />
        ) : (
          <>
            <ImageUpload
              ref={register({ required: '不可為空' })}
              name="id_card_img"
              defaultValue={userIdentity?.id_card_img}
            />
            <FieldValidateMessage error={errors.id_card_img} />
          </>
        )}
        {userIdentity?.is_confirm ? (
          <button className="btnbase primary_btn mt-4 mb-2" disabled>
            已通過
          </button>
        ) : (
          <button type="submit" className="btnbase primary_btn mt-4 mb-2">
            送出
          </button>
        )}
      </form>
    </BottomPopup>
  )
}

export default ProfileRealNamePopup
