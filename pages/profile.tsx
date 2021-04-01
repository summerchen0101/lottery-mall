import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Input } from '@chakra-ui/input'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import {
  BiArrowFromBottom,
  BiArrowToBottom,
  BiEnvelope,
  BiUser,
  BiRefresh,
} from 'react-icons/bi'

function profile() {
  const { useUserProfile } = useService()
  const router = useRouter()
  const { data: res, error } = useUserProfile()
  const { toCurrency } = useTransfer()
  return (
    <Layout>
      <HeaderTitleBar back title="我的" />
      <Box flex="1" overflowY="auto" p="20px">
        {res && (
          <Stack as="form" spacing="12px" noValidate>
            <FormControl>
              <FormLabel>真实姓名</FormLabel>
              <Input bg="white" defaultValue={res.data.name} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>會員帳號</FormLabel>
              <Input bg="white" defaultValue={res.data.username} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>電子郵件</FormLabel>
              <Editable
                defaultValue={res.data.email}
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
              <Input bg="white" defaultValue={res.data.phone} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>QQ</FormLabel>
              <Input bg="white" defaultValue={res.data.qq} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>微信</FormLabel>
              <Input bg="white" defaultValue={res.data.weixin} />
            </FormControl>
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default profile
