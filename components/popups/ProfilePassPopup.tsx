import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { useToast } from '@chakra-ui/toast'
import useService from '@/utils/useService'
import FieldValidateMessage from '../FieldValidateMessage'
import pattern from '@/lib/pattern'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#login-pw-edit').addClass('slide-up')
}

interface FormProps {
  old_pass: string
  pass: string
  pass_confirm: string
}

function ProfilePassPopup() {
  const { register, handleSubmit, errors, reset, watch } = useForm<FormProps>()
  const API = useRequest()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.updatePw({
        old_pass: d.old_pass,
        pass: d.pass,
      })
      toast({ status: 'success', title: '更新成功' })
      reset()
      $('.mask').fadeOut()
      $('.slide-up-section').removeClass('slide-up')
    } catch (err) {}
  })
  useEffect(() => {
    $('.login-pw').on('click', jqEffectFunc)
    return () => {
      $('.login-pw').off()
    }
  }, [])
  return (
    <BottomPopup title="密码修改" id="login-pw-edit" onClose={reset}>
      <form onSubmit={onSubmit} noValidate>
        <label className="form-label">当前密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input account-input"
            placeholder="请输入旧密码"
            name="old_pass"
            ref={register({ required: '不可为空' })}
          />
          <FieldValidateMessage error={errors.old_pass} />
        </div>
        <label className="form-label">新密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="新密码"
            name="pass"
            ref={register({
              required: '不可为空',
              pattern: {
                value: pattern.pass,
                message: '格式有误',
              },
            })}
          />
          <FieldValidateMessage error={errors.pass} />
        </div>
        <label className="form-label">确认新密码</label>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="确认新密码"
            name="pass_confirm"
            ref={register({
              required: '不可为空',
              validate: (value) =>
                value !== watch('pass') ? '密码不同' : true,
            })}
          />
          <FieldValidateMessage error={errors.pass_confirm} />
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2">
          送出
        </button>
      </form>
    </BottomPopup>
  )
}

export default ProfilePassPopup
