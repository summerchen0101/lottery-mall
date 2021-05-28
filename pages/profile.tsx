import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { PasswordType } from '@/lib/enums'
import useUserInfo from '@/service/useUserInfo'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function profile() {
  const { userInfo, isLoading } = useUserInfo()
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="我的" />
      <Box flex="1" overflowY="auto" p="20px">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                真实姓名
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.name}
              </Text>
            </Box>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                会员帐号
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.username}
              </Text>
            </Box>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                电子邮件
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.email}
              </Text>
            </Box>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                手机号码
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.phone}
              </Text>
            </Box>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                QQ
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.qq}
              </Text>
            </Box>
            <Box borderBottom="1px solid #ccc" py="5px">
              <Text fontSize="sm" mb="5px">
                微信
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {userInfo?.weixin}
              </Text>
            </Box>
            <Divider h="3" />
            <HStack>
              <Button
                colorScheme="pink"
                size="lg"
                w="full"
                onClick={() => router.push(`/pass/${PasswordType.Normal}`)}
              >
                登入密码
                <Icon as={HiPencilAlt} ml="2" />
              </Button>
              <Button
                colorScheme="purple"
                size="lg"
                w="full"
                onClick={() => router.push(`/pass/${PasswordType.Trade}`)}
              >
                交易密码
                <Icon as={HiPencilAlt} ml="2" />
              </Button>
            </HStack>
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default profile
