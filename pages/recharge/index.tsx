import BarItem from '@/components/BarItem'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { OfflinePayment } from '@/lib/enums'
import usePaymentList from '@/service/usePaymentList'
import useUserInfo from '@/service/useUserInfo'
import useTransfer from '@/utils/useTransfer'
import { Box, Stack, Text } from '@chakra-ui/layout'
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
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="15px">
            <Text color="purple.600" fontWeight="600" fontSize="xl">
              余额： $ {toCurrency(userInfo?.money)}
            </Text>
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
            {offline[OfflinePayment.USDT] && <BarItem>USDT转帐</BarItem>}
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeIndex
