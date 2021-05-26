import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecItem from '@/components/RecItem'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType } from '@/lib/enums'
import { financeRecDateRangeOpts } from '@/lib/options'
import useFinanceRec from '@/service/useFinanceRec'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Box, Stack } from '@chakra-ui/layout'
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
      <Box p="20px" flex="1" overflowY="auto">
        <Select
          value={dateRangeType}
          onChange={(e) =>
            router.push({
              pathname: router.pathname,
              query: { range: e.target.value },
            })
          }
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
          <RecItem title="优惠总计" num={discount} />
          <RecItem title="代理优惠总计" num={agentDiscount} />
        </Stack>
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}
