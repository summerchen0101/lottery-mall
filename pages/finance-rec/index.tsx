import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecItem from '@/components/RecItem'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType, DiscountLogType } from '@/lib/enums'
import { financeRecDateRangeOpts } from '@/lib/options'
import useFinanceRec from '@/service/useFinanceRec'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

export default function financeRec() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const [dateRangeType, setDateRangeType] = useState(DateRangeType.Today)
  const { toCurrency } = useTransfer()
  const [startM, endM] = useDateRange(dateRangeType)
  const { withdraw, recharge, discount, agentDiscount } = useFinanceRec(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )

  useEffect(() => {
    const range = (router.query.range as unknown) as DateRangeType
    range
      ? setDateRangeType(range)
      : router.push({
          pathname: router.pathname,
          query: { range: DateRangeType.Today },
        })
  }, [router])

  return (
    <Layout>
      <HeaderTitleBar back backPath="/my" title="财务纪录" />
      <Box flex="1" overflowY="auto">
        <HStack
          className="formGroup"
          p="15px"
          borderBottom="1px"
          borderColor="rgba(255,255,255,.2)"
        >
          <Text w="100px" color="#fff">
            财务区间
          </Text>
          <Select
            value={dateRangeType}
            className="formSelect"
            onChange={(e) =>
              router.push({
                pathname: router.pathname,
                query: { range: e.target.value },
              })
            }
          >
            {financeRecDateRangeOpts?.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </HStack>

        <Stack spacing="0px">
          <RecItem
            title="存款总计"
            num={recharge}
            onClick={() =>
              router.push({
                pathname: '/finance-rec/recharge',
                query: router.query,
              })
            }
          />
          <RecItem
            title="提款总计"
            num={withdraw}
            onClick={() =>
              router.push({
                pathname: '/finance-rec/withdraw',
                query: router.query,
              })
            }
          />
          <RecItem
            title="优惠总计"
            num={discount}
            onClick={() =>
              router.push({
                pathname: '/finance-rec/discount',
                query: {
                  range: router.query.range,
                  type: DiscountLogType.Normal,
                },
              })
            }
          />
          <RecItem
            title="代理优惠总计"
            num={agentDiscount}
            onClick={() =>
              router.push({
                pathname: '/finance-rec/discount',
                query: {
                  range: router.query.range,
                  type: DiscountLogType.Agent,
                },
              })
            }
          />
        </Stack>
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}
