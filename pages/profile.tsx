import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useUserInfo from '@/service/useUserInfo'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack } from '@chakra-ui/layout'
import React from 'react'

function profile() {
  const { userInfo } = useUserInfo()
  return (
    <Layout>
      <HeaderTitleBar back title="我的" />
      <Box flex="1" overflowY="auto" p="20px">
        <Stack as="form" spacing="12px" noValidate>
          <FormControl>
            <FormLabel>真实姓名</FormLabel>
            <Input bg="white" defaultValue={userInfo?.name} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>會員帳號</FormLabel>
            <Input bg="white" defaultValue={userInfo?.username} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>電子郵件</FormLabel>
            <Editable
              defaultValue={userInfo?.email}
              bg="white"
              h="40px"
              borderRadius="5px"
              px="10px"
              lineHeight="35px"
              border="1px solid #e2e8f0"
            >
              <EditablePreview w="full" />
              <EditableInput _focus={{}} />
            </Editable>
          </FormControl>
          <FormControl>
            <FormLabel>手機號碼</FormLabel>
            <Input bg="white" defaultValue={userInfo?.phone} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>QQ</FormLabel>
            <Input bg="white" defaultValue={userInfo?.qq} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>微信</FormLabel>
            <Input bg="white" defaultValue={userInfo?.weixin} />
          </FormControl>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default profile
