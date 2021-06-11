import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType, WithdrawStatus } from '@/lib/enums'
import { withdrawStatusOpts } from '@/lib/options'
import useWithdrawLog from '@/service/useWithdrawLog'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Box, Center, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi'

export default function withdraweRec() {
  const router = useRouter()
  const dateRange = useMemo(
    () => (router.query.range as unknown) as DateRangeType,
    [router],
  )
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>()
  const { toCurrency, toOptionName } = useTransfer()

  const dateRangeObj = useDateRange(dateRangeType)
  const { withdrawList, total, isLoading } = useWithdrawLog(
    dateRangeObj?.[0].format('YYYY-MM-DD'),
    dateRangeObj?.[1].format('YYYY-MM-DD'),
  )

  useEffect(() => {
    dateRange && setDateRangeType(dateRange)
  }, [router])

  return (
    <Layout>
      <HeaderTitleBar back title="提领纪录" />
      <HStack bg="contentBg.500" color="#fff" px="15px" py="10px" fontSize="sm">
        <Icon as={HiOutlineDocumentText} fontSize="35px" />
        <Box>
          <Text>
            {dateRangeObj?.[0].format('YYYY-MM-DD')} ~{' '}
            {dateRangeObj?.[1].format('YYYY-MM-DD')}
          </Text>
          <Text>总笔数：{toCurrency(total, 0)} 笔</Text>
        </Box>
      </HStack>
      <Box p="15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="10px">
            {withdrawList?.map((t) => (
              <Box key={t.id} borderRadius="md" overflow="hidden">
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
                        t.status === WithdrawStatus.Success ? 'green' : 'red'
                      }
                    >
                      {toOptionName(withdrawStatusOpts, t.status)}
                    </Tag>
                  </HStack>
                  {/* <HStack justify="space-between" fontWeight="bold">
                    <Text >单号：</Text>
                    <Text>{t.order_sn}</Text>
                  </HStack> */}
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>类型：</Text>
                    <Text>{t.description || '-'}</Text>
                  </HStack>
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>提领金额：</Text>
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
