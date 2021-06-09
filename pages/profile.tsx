import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { PasswordType } from '@/lib/enums'
import useUserInfo from '@/service/useUserInfo'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Center, Divider, HStack, Stack, Text } from '@chakra-ui/layout'
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
      <Box flex="1" className="layout">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Stack>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
              <Text fontSize="sm" mb="5px" color="gray.400">
                真实姓名
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.name}
              </Text>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
              <Text fontSize="sm" mb="5px" color="gray.400">
                会员帐号
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.username}
              </Text>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
              <Text fontSize="sm" mb="5px" color="gray.400">
                电子邮件
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.email || '-'}
              </Text>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
              <Text fontSize="sm" mb="5px" color="gray.400">
                手机号码
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.phone || '-'}
              </Text>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
              <Text fontSize="sm" mb="5px" color="gray.400">
                QQ
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.qq || '-'}
              </Text>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px" mb="5">
              <Text fontSize="sm" mb="5px" color="gray.400">
                微信
              </Text>
              <Text fontSize="md" fontWeight="600" color="#fff">
                {userInfo?.weixin || '-'}
              </Text>
            </Box>

            <HStack>
              <Button
                borderRadius="3px"
                bg="transparent"
                border="1px"
                borderColor="brand.500"
                color="brand.500"
                w="full"
                onClick={() => router.push(`/pass/${PasswordType.Normal}`)}
              >
                登入密码
                <Icon as={HiPencilAlt} ml="2" fontSize="xl" />
              </Button>
              <Button
                borderRadius="3px"
                bg="transparent"
                border="1px"
                borderColor="brand.500"
                color="brand.500"
                w="full"
                onClick={() => router.push(`/pass/${PasswordType.Trade}`)}
              >
                交易密码
                <Icon as={HiPencilAlt} ml="2" fontSize="xl" />
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
