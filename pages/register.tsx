import Layout from '@/components/Layout'
import { Box, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const register: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <Box className="login-content" h="100vh" w="100vw" overflowY="auto">
        <Box className="lang-select">
          <Image className="flag" src="/images/lang_cn.png" m="auto" />
        </Box>
        <Box className="logo" mt="0">
          <Image src="images/logo.png" m="auto" />
        </Box>
        <form className="form">
          <div className="form-title">注册</div>
          <div className="form-group">
            <input
              type="text"
              className="form-input account-input"
              placeholder="請輸入帳號"
              id="register-name"
            />
            <i className="iconfont iconclear btn_cancel" />
            {/* <small class="text-red"><i class="iconfont iconerror mr-1"></i>輸入帳號错误</small> */}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              maxLength={12}
              placeholder="输入8-12位含大小写与数字组合密码"
              id="register-pw"
            />
            <i className="iconfont iconeye-close btn_eye" />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="确认密码"
              id="register-pw2"
            />
            <i className="iconfont iconeye-close btn_eye" />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-input account-input"
              placeholder="请输入手机号码"
              id="register-tel"
            />
            <i className="iconfont iconclear btn_cancel" />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="请输入邮箱账号"
              id="register-email"
            />
            <i className="iconfont iconclear btn_cancel" />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="请输入推荐码"
              id="register-promotion"
            />
            <i className="iconfont iconclear btn_cancel" />
          </div>
          <label className="form-checkbox ">
            <input className="input-check" name="sort" type="checkbox" />
            <span className="checkmark" />
            <p className="ft-15 text-lighgray">
              我已阅读并同意
              <span
                className="text-blue ml-1"
                data-toggle="modal"
                data-target="#policyModal"
              >
                条款与规则
              </span>{' '}
            </p>
          </label>
          <button
            type="submit"
            className="btnbase primary_btn mt-4 mb-2"
            id="register_btn"
            disabled
          >
            注册帐号
          </button>
        </form>
      </Box>
    </Layout>
  )
}

export default register
