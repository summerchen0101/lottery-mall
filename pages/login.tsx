import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import { useAlertProvider } from '@/context/AlertProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import pattern from '@/lib/pattern'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import { Box, Button, HStack, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  acc: string
  pass: string
  code: string
}

function login() {
  const router = useRouter()
  const { token, setToken } = useGlobalProvider()
  const API = useRequest()
  const { copyToClipboard } = useHelper()
  const [captchaImg, setCaptchaImg] = useState('')
  const { register, handleSubmit, errors, getValues } = useForm<FormData>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.login({
        acc: d.acc,
        pass: d.pass,
        code: d.code,
        token,
      })
      setToken(res.data.token)
      router.push('/home')
    } catch (err) {}
  })
  const fetchCaptcha = async () => {
    try {
      const res = await API.getCaptcha()
      setCaptchaImg(res.data.img)
      setToken(res.data.token)
    } catch (err) {}
  }
  useEffect(() => {
    fetchCaptcha()
  }, [])
  return (
    <Layout>
      <Box className="login-content" h="100vh" w="100vw" overflowY="auto">
        {/* <Box className="lang-select">
          <Image className="flag" src="/images/lang_cn.png" m="auto" />
        </Box> */}
        <Box className="logo">
          <Image src="/images/logo.png" m="auto" />
        </Box>
        <Box as="form" className="form" minH="400px" onSubmit={onSubmit}>
          <div className="form-title">欢迎登录</div>
          <Box className="form-group">
            <input
              type="text"
              className="form-input account-input"
              name="acc"
              placeholder="请输入帐号"
              ref={register({
                required: '不可为空',
                pattern: {
                  value: pattern.acc,
                  message: '格式有误',
                },
              })}
            />
            <FieldValidateMessage error={errors.acc} />
          </Box>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              name="pass"
              ref={register({ required: '不可为空' })}
              placeholder="请输入密码"
            />
            {/* <i className="iconfont iconeye-close btn_eye" /> */}
          </div>
          <HStack>
            <Box className="form-group" w="80%">
              <input
                type="text"
                className="form-input"
                name="code"
                placeholder="请输入验证码"
                ref={register({ required: '不可为空' })}
              />
              <FieldValidateMessage error={errors.code} />
            </Box>
            <Image src={captchaImg} onClick={() => fetchCaptcha()} />
          </HStack>
          {/* <label className="form-checkbox ">
            <input className="input-check" name="sort" type="checkbox" />
            <span className="checkmark" />
            <p className="ft-15 text-lighgray">记忆帐密</p>
          </label> */}
          <button type="submit" className="btnbase primary_btn mt-4 mb-2">
            登录
          </button>
          <button
            type="button"
            className="btnbase forget_pwd"
            onClick={() => router.push('/forget')}
          >
            忘记密码
          </button>
        </Box>
      </Box>
    </Layout>
  )
}

export default login
