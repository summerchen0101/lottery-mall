import BarItem from '@/components/BarItem'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { OfflinePayment } from '@/lib/enums'
import usePaymentList from '@/service/usePaymentList'
import useUserInfo from '@/service/useUserInfo'
import useTransfer from '@/utils/useTransfer'
import { Box, Stack, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function rechargeIndex() {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { userInfo } = useUserInfo()

  const { online, offline, isLoading } = usePaymentList()

  return (
    <Layout>
      <HeaderTitleBar back title="会员充值" />
      <Box flex="1" overflowY="auto" pb="55px">
        {isLoading ? (
          <Spinner />
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
            <VStack spacing="10px" px="15px">
              <BarItem>客服激活</BarItem>
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
                  {t.name}
                </BarItem>
              ))}
              {offline[OfflinePayment.Bankcard] && (
                <BarItem onClick={() => router.push('/recharge/bankcard')}>
                  银行卡
                </BarItem>
              )}
              {offline[OfflinePayment.USDT] && (
                <BarItem onClick={() => router.push('/recharge/usdt')}>
                  USDT转帐
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
