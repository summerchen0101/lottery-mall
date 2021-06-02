import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { DateRangeType } from '@/lib/enums'
import { codeAmountDateRangeOpts } from '@/lib/options'
import useUserInfo from '@/service/useUserInfo'
import useCodeAmountList from '@/service/useWithdrawRec'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'

function withdrawIndex() {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { userInfo } = useUserInfo()
  const dateRangeType = useMemo(
    () =>
      ((router.query.range as unknown) as DateRangeType) ??
      DateRangeType.inYear,
    [router],
  )

  const [startM, endM] = useDateRange(dateRangeType)

  const { codeAmountList, isLoading } = useCodeAmountList(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )

  return (
    <Layout>
      <HeaderTitleBar back title="提现纪录" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack spacing="15px">
          <Text color="purple.600" fontWeight="600" fontSize="lg">
            余额： $ {toCurrency(userInfo?.money)}
          </Text>
          <Text color="red.500" fontSize="sm" fontWeight="600">
            单周限制1次提款，超过次数需额外收取手续费3%。 <br />
            (详情请查阅GEM公告)
          </Text>
          <Button
            colorScheme="pink"
            w="full"
            onClick={() => router.push('/withdraw/add')}
          >
            提款
          </Button>
          <Select
            value={dateRangeType}
            onChange={(e) =>
              router.push({
                pathname: router.pathname,
                query: { range: e.target.value },
              })
            }
            shadow="sm"
            bg="white"
          >
            {codeAmountDateRangeOpts?.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>

          {codeAmountList?.map((t) => (
            <Stack
              key={t.id}
              bg="white"
              p="15px"
              borderRadius="lg"
              shadow="md"
              spacing="1"
            >
              <HStack justify="space-between">
                <Text color="gray.900" fontSize="md" fontWeight="600">
                  {t.created_at}
                </Text>
                <Tag
                  variant="solid"
                  borderRadius="4px"
                  colorScheme={t.status ? 'pink' : 'gray'}
                >
                  {t.status ? '通过' : '未通过'}
                </Tag>
              </HStack>
              <Text>存款金额：{toCurrency(+t.money)}</Text>
              <Text>提款限制额：{toCurrency(+t.need)}</Text>
              <Text>累积下单额：{toCurrency(+t.effect)}</Text>
            </Stack>
          ))}
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default withdrawIndex
