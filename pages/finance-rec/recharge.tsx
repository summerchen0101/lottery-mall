import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType, RechargeStatus } from '@/lib/enums'
import { rechargeStatusOpts } from '@/lib/options'
import useRechargeLog from '@/service/useRechargeLog'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

export default function rechargeRec() {
  const router = useRouter()
  const dateRange = useMemo(
    () => (router.query.range as unknown) as DateRangeType,
    [router],
  )
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>()
  const { toCurrency, toOptionName } = useTransfer()

  const dateRangeObj = useDateRange(dateRangeType)
  const { rechargeList, isLoading } = useRechargeLog(
    dateRangeObj?.[0].format('YYYY-MM-DD'),
    dateRangeObj?.[1].format('YYYY-MM-DD'),
  )

  useEffect(() => {
    dateRange && setDateRangeType(dateRange)
  }, [router])

  return (
    <Layout>
      <HeaderTitleBar back title="充值纪录" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="15px">
            {rechargeList?.map((t) => (
              <Stack
                key={t.id}
                bg="white"
                shadow="md"
                borderLeftWidth="5px"
                // borderRightWidth="3px"
                borderColor="gray.400"
                p="15px"
                fontSize="sm"
                color="gray.700"
                spacing="5px"
              >
                <HStack justify="space-between" fontWeight="bold">
                  <Text>{t.created_at}</Text>
                  <Tag
                    variant="solid"
                    colorScheme={
                      t.status === RechargeStatus.Success ? 'pink' : 'gray'
                    }
                  >
                    {toOptionName(rechargeStatusOpts, t.status)}
                  </Tag>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">单号：</Text>
                  <Text>{t.order_sn}</Text>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">充值金额：</Text>
                  <Text color="purple.600" fontSize="lg">
                    ¥ {t.money}
                  </Text>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">支付管道：</Text>
                  <Text>{t.description || '-'}</Text>
                </HStack>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </Layout>
  )
}
