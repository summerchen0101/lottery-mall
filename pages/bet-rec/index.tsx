import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType } from '@/lib/enums'
import { betDateRangeOpts } from '@/lib/options'
import useBetRecByDate from '@/service/useBetRecByDate'
import useDateRange from '@/utils/useDateRange'
import { Box, Center, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo, useState } from 'react'

function betRec() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const dateRangeType = useMemo(
    () =>
      ((router.query.range as unknown) as DateRangeType) ?? DateRangeType.Today,
    [router],
  )

  const [startM, endM] = useDateRange(dateRangeType)

  const { dateBetData, isLoading } = useBetRecByDate(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )

  return (
    <Layout>
      <HeaderTitleBar backPath="/lottery" title="下单纪录" />
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
          {betDateRangeOpts?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <SimpleGrid
              columns={3}
              align="center"
              bg="white"
              p="10px"
              borderRadius="md"
              shadow="md"
              mb="20px"
            >
              <Box>
                <Text fontSize="sm" color="gray.500">
                  总计(实际损益)
                </Text>
                <Text fontSize="xl" color="purple.600" fontWeight="600">
                  {dateBetData?.profit}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  投资结算
                </Text>
                <Text fontSize="xl" color="purple.600" fontWeight="600">
                  {dateBetData?.win_money}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  交易金额
                </Text>
                <Text fontSize="xl" color="pink.500" fontWeight="600">
                  {dateBetData?.bet_money}
                </Text>
              </Box>
            </SimpleGrid>
            <Stack spacing="15px">
              {dateBetData?.list.map((t, i) => (
                <HStack
                  key={i}
                  bg="white"
                  shadow="md"
                  borderLeftWidth="5px"
                  borderColor="gray.400"
                  p="2"
                  fontSize="sm"
                  color="gray.700"
                  borderRadius="md"
                  onClick={() => router.push(`/bet-rec/${t.date}`)}
                >
                  <Center w="100px" fontWeight="600">
                    {t.date}
                  </Center>
                  <Stack spacing="0">
                    <Text>
                      实际损益：
                      <Text as="span" fontWeight="600" color="green.500">
                        {t.profit}
                      </Text>
                    </Text>
                    <Text>
                      投资节算：
                      <Text as="span" fontWeight="600" color="pink.500">
                        {t.win_money}
                      </Text>
                    </Text>
                    <Text>
                      交易金额：
                      <Text as="span" fontWeight="600" color="gray.500">
                        {t.bet_money}
                      </Text>
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          </>
        )}
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}

export default betRec
