import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType, DiscountLogType, RechargeStatus } from '@/lib/enums'
import { rechargeStatusOpts } from '@/lib/options'
import useDiscountLog from '@/service/useDiscountLog'
import useRechargeLog from '@/service/useRechargeLog'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Box, Center, HStack, Stack, Text } from '@chakra-ui/layout'
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
  const discountType = useMemo(
    () => (router.query.type as unknown) as DiscountLogType,
    [router],
  )
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>()
  const { toCurrency, toOptionName } = useTransfer()

  const dateRangeObj = useDateRange(dateRangeType)
  const { discountList, isLoading } = useDiscountLog(
    dateRangeObj?.[0].format('YYYY-MM-DD'),
    dateRangeObj?.[1].format('YYYY-MM-DD'),
    discountType,
  )

  useEffect(() => {
    dateRange && setDateRangeType(dateRange)
  }, [router])

  return (
    <Layout>
      <HeaderTitleBar back title="优惠纪录" />
      <Box bg="contentBg.500" color="#fff" px="15px" py="10px" fontSize="sm">
        <Text>2021-04-25 ~ 2021-06-11</Text>
        <Text>总笔数 6 笔</Text>
      </Box>
      <Box p="15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="10px">
            {discountList?.map((t) => (
              <Box borderRadius="md" overflow="hidden">
                <Stack
                  key={t.id}
                  bg="contentBg.500"
                  p="10px 15px"
                  color="gray.300"
                  fontSize="sm"
                  spacing="5px"
                >
                  <HStack justify="space-between">
                    <Text>{t.created_at}</Text>
                    <Tag
                      variant="solid"
                      colorScheme={
                        t.status === RechargeStatus.Success ? 'green' : 'red'
                      }
                    >
                      {toOptionName(rechargeStatusOpts, t.status)}
                    </Tag>
                  </HStack>
                  {/* <HStack justify="space-between" fontWeight="bold">
                    <Text >单号：</Text>
                    <Text>{t.order_sn}</Text>
                  </HStack> */}
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>优惠类型：</Text>
                    <Text>{t.description || '-'}</Text>
                  </HStack>
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>金额：</Text>
                    <Text fontSize="xl" color="yellow.500" fontWeight="600">
                      ¥ {t.money}
                    </Text>
                  </HStack>
                </Stack>
                <Center bg="#535353" fontSize="sm" color="gray.300" h="25px">
                  <Text>订单号：{t.order_sn}</Text>
                </Center>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Layout>
  )
}
