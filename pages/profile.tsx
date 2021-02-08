import React, { useEffect } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import $ from 'jquery'
import ProfileNickPopup from '@/components/popups/ProfileNickPopup'
import ProfileEmailPopup from '@/components/popups/ProfileEmailPopup'
import ProfilePhonePopup from '@/components/popups/ProfilePhonePopup'
import ProfilePassPopup from '@/components/popups/ProfilePassPopup'
import ProfileWechatPopup from '@/components/popups/ProfileWechatPopup'
import ProfileQqPopup from '@/components/popups/ProfileQqPopup'
import { Router, useRouter } from 'next/dist/client/router'
import ProfileRealNamePopup from '@/components/popups/ProfileRealNamePopup'
import ProfileBankCardPopup from '@/components/popups/ProfileBankCardPopup'
import ProfileField from '@/components/ProfileField'
import { Box, Text } from '@chakra-ui/react'
import useService from '@/utils/useService'
import { useGlobalProvider } from '@/context/GlobalProvider'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  const { fetchUserInfo } = useService()
  const { user } = useGlobalProvider()
  useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar title="个人资料" />
      <Box className="main-content background-gray" h="100vh" overflowY="auto">
        <ul className="list-group col-list">
          <li className="thead col-list-item section-padding pointer">
            基本资料
          </li>
          <ProfileField label="昵称" code="nickname">
            <Text color="gray.400">{user?.acc}</Text>
          </ProfileField>
          <ProfileField label="真实姓名" code="name">
            <Text color="gray.400">{user?.name}</Text>
          </ProfileField>

          <li className="thead col-list-item section-padding pointer">
            账户安全
          </li>
          <ProfileField label="电子邮箱" code="email">
            <Text color="gray.400">{user?.email}</Text>
          </ProfileField>
          <ProfileField label="手机号码" code="tel">
            <Text color="gray.400">{user?.mobile}</Text>
          </ProfileField>
          {/* <ProfileField label="密码" code="login-pw"></ProfileField> */}

          {/* <li className="thead col-list-item section-padding pointer">
              社群
            </li>
            <ProfileField label="微信" code="wechat">
              <Text color="gray.400">未设置</Text>
            </ProfileField>
            <ProfileField label="QQ" code="qq">
              <Text color="gray.400">未设置</Text>
            </ProfileField> */}

          <li className="thead col-list-item section-padding pointer">金融</li>
          <ProfileField label="银行卡" code="bank-card">
            {/* <Text color="red">未设置</Text> */}
          </ProfileField>
          {/* <ProfileField label="提领密码" code="withdrawal-pw"></ProfileField> */}
        </ul>
        {/* <div className="register_time pt-3 text-lighgray">
            注册时间<span>2020/06/08 15:50:16</span>
          </div> */}
      </Box>

      <ProfileNickPopup />
      <ProfileEmailPopup />
      <ProfilePhonePopup />
      <ProfilePassPopup />
      <ProfileWechatPopup />
      <ProfileQqPopup />
      <ProfileRealNamePopup />
      <ProfileBankCardPopup />

      <FooterNavBar />
    </Layout>
  )
}

export default ProfilePage
