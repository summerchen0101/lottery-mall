import Layout from '@/components/Layout'
import { Box, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function login() {
  const router = useRouter()
  return (
    <Layout>
      <Box h="100vh" w="100vw">
        <div className="login-content">
          {/* <div className="lang-select">
            <img className="flag" src="images/lang_cn.png" />
          </div> */}
          <div className="logo">
            <Image src="images/logo.png" m="auto" />
          </div>
          <form className="form" style={{ minHeight: 400 }}>
            <div className="form-title">欢迎登入</div>
            <div className="form-group">
              <input
                type="text"
                className="form-input account-input"
                required
                placeholder="請輸入帳號"
                id="username"
              />
              <i className="iconfont iconclear btn_cancel" />
              {/* <small class="text-red"><i class="iconfont iconerror mr-1"></i>輸入帳號错误</small> */}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                required
                placeholder="请输入密码"
                id="password"
              />
              <i className="iconfont iconeye-close btn_eye" />
            </div>
            <label className="form-checkbox ">
              <input className="input-check" name="sort" type="checkbox" />
              <span className="checkmark" />
              <p className="ft-15 text-lighgray">记忆帐密</p>
            </label>
            <button
              type="button"
              className="btnbase primary_btn mt-4 mb-2"
              onClick={() => router.push('/')}
            >
              登入
            </button>
            <button
              className="btnbase forget_pwd"
              // onClick="location.href = 'forget-pw.html'"
            >
              忘记密码
            </button>
          </form>
        </div>
      </Box>
    </Layout>
  )
}

export default login
