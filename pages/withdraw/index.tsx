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
import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
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
      <HeaderTitleBar back title="会员提款" />
      <Box flex="1" overflowY="auto" pb="55px">
        <Stack spacing="0">
          <Box
            color="#fff"
            bg="contentBg.500"
            lineHeight="30px"
            px="15px"
            py="10px"
          >
            余额 /{' '}
            <Text
              ml="2"
              fontSize="2xl"
              as="span"
              color="brand.500"
              fontWeight="600"
            >
              $ {toCurrency(userInfo?.money)}
            </Text>
            <Button
              colorScheme="brand"
              w="full"
              mt="10px"
              h="36px"
              borderRadius="sm"
              onClick={() => router.push('/withdraw/add')}
            >
              提款
            </Button>
            <Text color="red.500" fontSize="12px" lineHeight="14px" mt="10px">
              单周限制1次提款，超过次数需额外收取手续费3%。(详情请查阅GEM公告)
            </Text>
          </Box>
          <Box px="15px" py="10px" bg="containerBg.500">
            <Flex className="formGroup" align="center">
              <Text w="50%" color="#fff">
                提款条件
              </Text>
              <Select
                w="50%"
                className="formSelect"
                value={dateRangeType}
                onChange={(e) =>
                  router.push({
                    pathname: router.pathname,
                    query: { range: e.target.value },
                  })
                }
              >
                {codeAmountDateRangeOpts?.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Flex>
          </Box>

          <VStack w="100%" p="10px 15px">
            {codeAmountList?.map((t) => (
              <Stack
                spacing="3px"
                w="100%"
                key={t.id}
                bg="contentBg.500"
                p="10px"
                borderRadius="lg"
                fontSize=".9375rem"
                color="gray.400"
              >
                <HStack justify="space-between">
                  <Text>{t.created_at}</Text>
                  <Tag
                    variant="solid"
                    borderRadius="4px"
                    colorScheme={t.status ? 'green' : 'red'}
                  >
                    {t.status ? '通过' : '未通过'}
                  </Tag>
                </HStack>
                <Text>
                  存款金额：
                  <Text as="span" color="#fff">
                    {toCurrency(+t.money)}
                  </Text>
                </Text>
                <Text>
                  提款限制额：
                  <Text as="span" color="#fff">
                    {toCurrency(+t.need)}
                  </Text>
                </Text>
                <Text>
                  累积下单额：
                  <Text as="span" color="#fff">
                    {toCurrency(+t.effect)}
                  </Text>
                </Text>
              </Stack>
            ))}
          </VStack>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default withdrawIndex
