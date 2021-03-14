import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import pattern from '@/lib/pattern'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { Box, Button, HStack, Image, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { isBrowser } from 'react-device-detect'
import { GetStaticProps } from 'next'

type FormData = {
  promo_code: string
  acc: string
  name: string
  pass: string
  pass_confirm: string
  mobile: string
  is_checked_rule: boolean
}

const register: React.FC = () => {
  if (isBrowser && process.browser) {
    const url = new URL(location.href)
    url.hostname = process.env.memberPcHost
    url.port = ''
    console.log(url.href)
    location.replace(url.href)
  }
  const { setToken } = useGlobalProvider()
  const { handleSendPhoneCode } = useService()
  const router = useRouter()
  const API = useRequest()
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    watch,
  } = useForm<FormData>()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.register({
        acc: d.acc,
        name: d.name,
        pass: d.pass,
        mobile: d.mobile,
        promo_code: router.query.code as string,
      })
      setToken(res.data.token)
      router.push('/home')
    } catch (err) {}
  })
  const handleAccCheck = async () => {
    if (!getValues('acc')) {
      toast({ status: 'info', title: '請先填寫帳號/手機' })
      return
    }
    try {
      await API.checkAcc(getValues('acc'))
      toast({ status: 'success', title: '帳號可用' })
    } catch (err) {}
  }
  const handleNameCheck = async () => {
    if (!getValues('name')) {
      toast({ status: 'info', title: '請先填寫暱稱' })
      return
    }
    try {
      await API.checkName(getValues('name'))
      toast({ status: 'success', title: '暱稱可用' })
    } catch (err) {}
  }
  return (
    <Layout>
      <Box className="login-content" h="100vh" w="100vw" overflowY="auto">
        {/* <Box className="lang-select">
          <Image className="flag" src="/images/lang_cn.png" m="auto" />
        </Box> */}
        <Box className="logo" mt="0">
          <Image src="/images/logo.png" m="auto" />
        </Box>
        <Box as="form" className="form" onSubmit={onSubmit} noValidate>
          <div className="form-title">注册</div>

          <div className="form-group">
            <HStack>
              <input
                type="text"
                className="form-input account-input"
                placeholder="請輸入帳號"
                name="acc"
                ref={register({
                  required: '不可為空',
                  pattern: {
                    value: pattern.acc,
                    message: '格式有誤',
                  },
                })}
              />
              <Button
                onClick={handleAccCheck}
                fontSize="sm"
                w="130px"
                color="gray"
              >
                帳號可用？
              </Button>
            </HStack>
            <FieldValidateMessage error={errors.acc} />
          </div>

          <div className="form-group">
            <HStack>
              <input
                type="text"
                className="form-input"
                placeholder="請輸入暱稱"
                name="name"
                ref={register({ required: '不可為空' })}
              />
              <Button
                onClick={handleNameCheck}
                fontSize="sm"
                w="130px"
                color="gray"
              >
                暱稱可用？
              </Button>
            </HStack>
            <FieldValidateMessage error={errors.name} />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="密码"
              name="pass"
              ref={register({
                required: '不可為空',
                pattern: {
                  value: pattern.pass,
                  message: '格式有誤',
                },
              })}
            />
            <FieldValidateMessage error={errors.pass} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="确认密码"
              name="pass_confirm"
              ref={register({
                required: '不可為空',
                validate: (value) =>
                  value !== getValues('pass') ? '密码不同' : true,
              })}
            />
            <FieldValidateMessage error={errors.pass_confirm} />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-input account-input"
              placeholder="请输入手机号码"
              name="mobile"
              ref={register({
                required: '不可為空',
                validate: (value) => {
                  if (
                    !pattern.twPhone.test(value) &&
                    !pattern.cnPhone.test(value)
                  ) {
                    return '手機格式不符'
                  }
                  return true
                },
              })}
            />
            <FieldValidateMessage error={errors.mobile} />
          </div>

          {/* <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="请输入推荐码"
              ref={register({ required: '不可為空' })}
            />
            <i className="iconfont iconclear btn_cancel" />
          </div> */}
          <label className="form-checkbox ">
            <input
              className="input-check"
              type="checkbox"
              name="is_checked_rule"
              ref={register({ required: '需打勾確認' })}
            />
            <span className="checkmark" />
            <p className="ft-15 text-lighgray">
              我已阅读并同意
              <span
                className="text-blue ml-1"
                data-toggle="modal"
                data-target="#policyModal"
              >
                条款与规则
              </span>
            </p>
            <FieldValidateMessage error={errors.is_checked_rule} />
          </label>
          <button type="submit" className="btnbase primary_btn mt-4 mb-2">
            注册帐号
          </button>
        </Box>
      </Box>
    </Layout>
  )
}

export default register
