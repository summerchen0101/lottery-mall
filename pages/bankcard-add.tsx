import React, { useMemo } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Select } from '@chakra-ui/select'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { useRouter } from 'next/dist/client/router'
import { bankCodeOpts } from '@/lib/options'
import { Box } from '@chakra-ui/layout'
import FieldValidateMessage from '@/components/FieldValidateMessage'
import ImageUpload from '@/components/ImageUpload'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { useToast } from '@chakra-ui/toast'

interface MemberBankForm {
  name: string
  branch: string
  acc: string
  person: string
  img: string
  is_default: boolean
}

const BankCardAddPage: React.FC = () => {
  const router = useRouter()
  const API = useRequest()
  const { toOptionName } = useTransfer()
  const { getBase64 } = useHelper()
  const toast = useToast()
  const { register, handleSubmit, errors, watch } = useForm<MemberBankForm>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.createMemberBank({
        name: toOptionName(bankCodeOpts, d.name),
        branch: d.branch,
        acc: d.acc,
        person: d.person,
        img: await getBase64(d.img[0]),
        // is_default: d.is_default,
        is_default: false,
      })
      await router.push('/bankcard')
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar back title="添加银行卡" />
      <div className="main-content section-padding">
        <Box as="form" noValidate onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label2">银行名称</label>
            <Select
              name="name"
              ref={register({ required: '不可为空' })}
              placeholder="请选择银行"
            >
              {bankCodeOpts.map((t, i) => (
                <option key={i} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.name} />
            <label className="form-label2">分行/分部名称</label>
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-input"
                placeholder="请输入分行/分部名称"
                name="branch"
                ref={register({ required: '不可为空' })}
              />
              <i className="iconfont iconclear btn_cancel" />
              <FieldValidateMessage error={errors.branch} />
            </div>
            <label className="form-label2">帐户号码</label>
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-input"
                placeholder="请输入银行帐号"
                name="acc"
                ref={register({ required: '不可为空' })}
              />
              <i className="iconfont iconclear btn_cancel" />
              <FieldValidateMessage error={errors.acc} />
            </div>
            <small className="text-lighgray">
              请认真校对银行帐号，帐号错误资金将无法到账
            </small>
            <label className="form-label2">帐户名称</label>
            <div className="form-group mb-1">
              <input
                type="text"
                className="form-input"
                placeholder="请输入帐户持有人姓名"
                name="person"
                ref={register({ required: '不可为空' })}
              />
              <i className="iconfont iconclear btn_cancel" />
              <FieldValidateMessage error={errors.person} />
            </div>
            <small className="text-lighgray d-block">
              为了您的资金能够迅速到账，请确保填写的姓名与账户姓名一致
            </small>
            {/* <label className="form-label2 w-25">默认帐户</label>
            <label className="form-switch">
              <input type="checkbox" name="is_default" ref={register} />
              <span className="slider " />
            </label> */}
            <label className="form-label2">照片上传</label>
            <ImageUpload ref={register({ required: '不可为空' })} name="img" />
            <FieldValidateMessage error={errors.img} />
            <p className="ft-14 text-red">
              <i className="iconfont iconremind mr-1" />
              银行卡号须与开卡人姓名一致（实名认证人）
            </p>
          </div>
          <button type="submit" className="btnbase primary_btn mt-2 mb-2">
            确定送出
          </button>
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default BankCardAddPage
