import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RechargeLogPopup from '@/components/RechargeLogPopup'
import WithdrawLogPopup from '@/components/WithdrawLogPopup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType } from '@/lib/enums'
import { financeRecDateRangeOpts } from '@/lib/options'
import useFinanceRec from '@/service/useFinanceRec'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function rank() {
  const router = useRouter()
  const [, setRechargeLogVisible] = usePopupContext('rechargeLog')
  const [, setWithdrawLogVisible] = usePopupContext('withdrawLog')
  const { loadingSpinner } = useLoaderProvider()
  const [dateRangeType, setDateRangeType] = useState(DateRangeType.Today)
  const { toCurrency } = useTransfer()
  const [startM, endM] = useDateRange(dateRangeType)
  const { withdraw, recharge } = useFinanceRec(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )
  return (
    <Layout>
      <HeaderTitleBar back title="财务纪录" />
      <Box p="20px" flex="1" overflowY="auto">
        <Select
          value={dateRangeType}
          onChange={(e) => setDateRangeType(+e.target.value)}
          mb="20px"
          shadow="lg"
          bg="white"
        >
          {financeRecDateRangeOpts?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
        <Stack spacing="15px" mt="30px">
          <HStack
            bg="white"
            h="60px"
            px="15px"
            borderRadius="md"
            shadow="md"
            justify="space-between"
            onClick={() => setRechargeLogVisible(true)}
          >
            <Text fontWeight="600" fontSize="lg">
              存款总计
            </Text>
            <Text fontWeight="bold" fontSize="xl" color="purple.600">
              ¥ {toCurrency(recharge, 0)}
            </Text>
          </HStack>
          <HStack
            bg="white"
            h="60px"
            px="15px"
            borderRadius="md"
            shadow="md"
            justify="space-between"
            onClick={() => setWithdrawLogVisible(true)}
          >
            <Text fontWeight="600" fontSize="lg">
              提款总计
            </Text>
            <Text fontWeight="bold" fontSize="xl" color="purple.600">
              ¥ {toCurrency(withdraw, 0)}
            </Text>
          </HStack>
        </Stack>
        <RechargeLogPopup dateType={dateRangeType} />
        <WithdrawLogPopup dateType={dateRangeType} />
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}

export default rank
