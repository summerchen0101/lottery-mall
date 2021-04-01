import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
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

function my() {
  const { useUserProfile } = useService()
  const router = useRouter()
  const { data: res, error } = useUserProfile()
  const { toCurrency } = useTransfer()
  return (
    <Layout>
      <HeaderTitleBar back title="我的" />
      <Box flex="1" overflowY="auto">
        <Box bg="purple.100" p="20px">
          <Text fontSize="sm" color="pink.500" fontWeight="bold">
            会员编号：{res?.data.uid}
          </Text>
          <HStack
            spacing="20px"
            mb="15px"
            color="purple.600"
            fontWeight="bold"
            fontSize="3xl"
          >
            <Text>$ {toCurrency(res?.data.money)}</Text>
            <Icon as={BiRefresh} />
          </HStack>

          <HStack
            bg="purple.600"
            justify="space-evenly"
            mb="-50px"
            color="white"
            borderRadius="lg"
            h="70px"
            shadow="lg"
          >
            <Box>
              <Icon fontSize="30px" as={BiArrowFromBottom} />
              <Text fontSize="sm">提现</Text>
            </Box>
            <Box>
              <Icon fontSize="30px" as={BiArrowToBottom} />
              <Text fontSize="sm">充值</Text>
            </Box>
            <Box onClick={() => router.push('/news')}>
              <Icon fontSize="30px" as={BiEnvelope} />
              <Text fontSize="sm">讯息</Text>
            </Box>
            <Box onClick={() => router.push('/profile')}>
              <Icon fontSize="30px" as={BiUser} />
              <Text fontSize="sm">设置</Text>
            </Box>
          </HStack>
        </Box>

        <Stack
          mt="60px"
          fontSize="xl"
          color="purple.600"
          fontWeight="bold"
          textAlign="center"
          p="10px"
          spacing="15px"
        >
          <Box
            bg="white"
            shadow="md"
            px="15px"
            py="15px"
            borderLeftWidth="4px"
            borderColor="purple.600"
            borderRadius="md"
            onClick={() => router.push('/bankcard')}
          >
            银行卡管理
          </Box>
          <Box
            bg="white"
            shadow="md"
            px="15px"
            py="15px"
            borderLeftWidth="4px"
            borderColor="purple.600"
            borderRadius="md"
            onClick={() => router.push('/finance-rec')}
          >
            财务管理
          </Box>
          <Box
            bg="white"
            shadow="md"
            px="15px"
            py="15px"
            borderLeftWidth="4px"
            borderColor="purple.600"
            borderRadius="md"
            onClick={() => router.push('/bet-rec')}
          >
            抢购纪录
          </Box>
          <Box
            bg="white"
            shadow="md"
            px="15px"
            py="15px"
            borderLeftWidth="4px"
            borderColor="purple.600"
            borderRadius="md"
            onClick={() => router.push('/faq')}
          >
            常见问题
          </Box>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default my
