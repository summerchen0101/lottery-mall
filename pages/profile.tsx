import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import ProfileEmailPopup from '@/components/popups/ProfileEmailPopup'
import ProfileLinePopup from '@/components/popups/ProfileLinePopup'
import ProfilePassPopup from '@/components/popups/ProfilePassPopup'
import ProfilePhonePopup from '@/components/popups/ProfilePhonePopup'
import ProfileQqPopup from '@/components/popups/ProfileQqPopup'
import ProfileRealNamePopup from '@/components/popups/ProfileRealNamePopup'
import ProfileTelegramPopup from '@/components/popups/ProfileTelegramPopup'
import ProfileWechatPopup from '@/components/popups/ProfileWechatPopup'
import ProfileField from '@/components/ProfileField'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import { Box, HStack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const ProfilePage: React.FC = () => {
  const { fetchUserContact, fetchUserIdentity } = useService()
  const { userContact, userIdentity } = useGlobalProvider()
  useEffect(() => {
    Promise.all([fetchUserContact(), fetchUserIdentity()])
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="个人资料" />
      <Box className="main-content background-gray" h="100vh" overflowY="auto">
        <ul className="list-group col-list">
          <li className="thead col-list-item section-padding pointer">
            基本资料
          </li>
          <ProfileField label="实名认证" code="name">
            {userIdentity?.name && (
              <HStack justify="flex-end">
                {!userIdentity.is_confirm ? (
                  <Text color="red.400">(未认证)</Text>
                ) : (
                  <Text color="green.400">(已认证)</Text>
                )}

                <Text color="gray.400">{userIdentity?.name}</Text>
              </HStack>
            )}
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
          <ProfileField label="交易密码" code="withdrawal-pw"></ProfileField>
        </ul>
        {/* <div className="register_time pt-3 text-lighgray">
            注册时间<span>2020/06/08 15:50:16</span>
          </div> */}
      </Box>

      <ProfileRealNamePopup />

      <ProfileEmailPopup />
      <ProfilePhonePopup />
      <ProfilePassPopup />
      <ProfileWechatPopup />
      <ProfileTelegramPopup />
      <ProfileLinePopup />
      <ProfileQqPopup />

      <FooterNavBar />
    </Layout>
  )
}

export default ProfilePage
