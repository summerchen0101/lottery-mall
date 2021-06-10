import BarItem from '@/components/BarItem'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { OfflinePayment, OnlinePayment } from '@/lib/enums'
import usePaymentList from '@/service/usePaymentList'
import useServiceLink from '@/service/useServiceLink'
import useUserInfo from '@/service/useUserInfo'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Image } from '@chakra-ui/image'
import { Box, Center, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const iconMap = {
  [OnlinePayment.Alipay]: '/img/ic-m-1.png',
  [OnlinePayment.Cloud]: '/img/ic-m-2.png',
  [OnlinePayment.USDT]: '/img/ic-m-4.png',
  [OnlinePayment.WeChat]: '/img/ic-m-3.png',
}

function rechargeIndex() {
  const { toCurrency } = useTransfer()
  const { openServiceWin } = useHelper()
  const router = useRouter()
  const { userInfo } = useUserInfo()

  const { online, offline, isLoading } = usePaymentList()
  const { serviceLink } = useServiceLink()

  return (
    <Layout>
      <HeaderTitleBar back title="会员充值" />
      <Box flex="1" overflowY="auto" pb="55px">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Stack spacing="15px">
            <Box color="#fff" bg="contentBg.500" lineHeight="50px" px="15px">
              余额 /
              <Text
                ml="2"
                fontSize="2xl"
                as="span"
                color="brand.500"
                fontWeight="600"
              >
                $ {toCurrency(userInfo?.money)}
              </Text>
            </Box>
            <Text px="15px" color="#fff">
              请选择您欲支付方式
            </Text>
            <VStack spacing="10px" px="15px" mb="10px">
              <BarItem onClick={() => openServiceWin(serviceLink, userInfo)}>
                <HStack spacing="20px">
                  <Image src="/img/ic-service.png" boxSize="48px" />
                  <VStack spacing="0" align="flex-start">
                    <Text>
                      客服激活
                      <Text as="span" ml="1" fontWeight="normal" fontSize="sm">
                        (提供USDT提款)
                      </Text>
                    </Text>
                    <Text fontSize="sm" color="#4284f4">
                      提供人工充值服务，最低入款金额50元
                    </Text>
                  </VStack>
                </HStack>
              </BarItem>
              {online?.map((t) => (
                <BarItem
                  key={t.id}
                  onClick={() =>
                    router.push({
                      pathname: '/recharge/online',
                      query: { id: t.id, name: t.name },
                    })
                  }
                >
                  <HStack spacing="20px">
                    <Image src={iconMap[t.id]} boxSize="48px" />
                    <VStack>
                      <Text>{t.name}</Text>
                    </VStack>
                  </HStack>
                </BarItem>
              ))}
              {offline[OfflinePayment.Bankcard] && (
                <BarItem onClick={() => router.push('/recharge/bankcard')}>
                  <HStack spacing="20px">
                    <Image src="/img/ic-m-5.png" boxSize="48px" />
                    <VStack>
                      <Text>银行卡</Text>
                    </VStack>
                  </HStack>
                </BarItem>
              )}
              {offline[OfflinePayment.USDT] && (
                <BarItem onClick={() => router.push('/recharge/usdt')}>
                  <HStack spacing="20px">
                    <Image src="/img/ic-m-5.png" boxSize="48px" />
                    <VStack>
                      <Text>USDT转帐</Text>
                    </VStack>
                  </HStack>
                </BarItem>
              )}
            </VStack>
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeIndex
