import React, { useEffect, useState } from 'react'
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
import useRequest from '@/utils/useRequest'
import { UserContact } from '@/lib/types'
import ProfileTelegramPopup from '@/components/popups/ProfileTelegramPopup'
import ProfileLinePopup from '@/components/popups/ProfileLinePopup'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  const API = useRequest()
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  useEffect(() => {
    fetchUserContact()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="个人资料" />
      <Box className="main-content background-gray" h="100vh" overflowY="auto">
        <ul className="list-group col-list">
          <li className="thead col-list-item section-padding pointer">
            基本资料
          </li>
          <ProfileField label="真实姓名" code="name">
            <Text color="gray.400">{userContact?.name}</Text>
          </ProfileField>
          <ProfileField label="电子邮箱" code="email">
            <Text color="gray.400">{userContact?.email}</Text>
          </ProfileField>
          <ProfileField label="手机号码" code="tel">
            <Text color="gray.400">{userContact?.mobile}</Text>
          </ProfileField>
          <ProfileField label="密码" code="login-pw"></ProfileField>

          <li className="thead col-list-item section-padding pointer">社群</li>
          <ProfileField label="微信" code="wechat">
            <Text color="gray.400">{userContact?.wechat_id || '未设置'}</Text>
          </ProfileField>
          <ProfileField label="QQ" code="qq">
            <Text color="gray.400">{userContact?.qq_id || '未设置'}</Text>
          </ProfileField>
          <ProfileField label="Telegram" code="telegram">
            <Text color="gray.400">{userContact?.telegram_id || '未设置'}</Text>
          </ProfileField>
          <ProfileField label="Line" code="line">
            <Text color="gray.400">{userContact?.line_id || '未设置'}</Text>
          </ProfileField>

          <li className="thead col-list-item section-padding pointer">金融</li>
          <ProfileField label="提领密码" code="withdrawal-pw"></ProfileField>
        </ul>
        {/* <div className="register_time pt-3 text-lighgray">
            注册时间<span>2020/06/08 15:50:16</span>
          </div> */}
      </Box>

      <ProfileRealNamePopup />
      <ProfileNickPopup />
      <ProfileEmailPopup />
      <ProfilePhonePopup />
      <ProfilePassPopup />
      <ProfileWechatPopup />
      <ProfileTelegramPopup />
      <ProfileLinePopup />
      <ProfileQqPopup />

      <ProfileBankCardPopup />

      <FooterNavBar />
    </Layout>
  )
}

export default ProfilePage
