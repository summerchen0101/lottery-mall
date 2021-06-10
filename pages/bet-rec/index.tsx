import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecPageTabs from '@/components/RecPageTabs'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType } from '@/lib/enums'
import { betDateRangeOpts } from '@/lib/options'
import useBetRecByDate from '@/service/useBetRecByDate'
import useDateRange from '@/utils/useDateRange'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
function betRec() {
  const router = useRouter()
  const { toCurrency } = useTransfer()
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

      <RecPageTabs />
      <HStack
        px="15px"
        className="formGroup"
        py="10px"
        mb="10px"
        borderBottom="1px"
        borderColor="rgba(255,255,255,.2)"
      >
        <Text minW="80px" color="#fff">
          账务区间
        </Text>
        <Select
          className="formSelect"
          value={dateRangeType}
          onChange={(e) =>
            router.push({
              pathname: router.pathname,
              query: { range: e.target.value },
            })
          }
        >
          {betDateRangeOpts?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </HStack>
      <Box flex="1" overflowY="auto" pb="110px">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <>
            <SimpleGrid
              bg="contentBg.500"
              w="100%"
              columns={3}
              align="center"
              p="5px 15px"
              shadow="md"
              pos="fixed"
              bottom="55px"
            >
              <Box>
                <Text fontSize="sm" color="#fff">
                  总计(实际损益)
                </Text>
                <Text fontSize="md" color="red.500" fontWeight="600">
                  {dateBetData?.profit}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="#fff">
                  投资结算
                </Text>
                <Text fontSize="md" color="red.500" fontWeight="600">
                  {toCurrency(+dateBetData?.win_money)}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="#fff">
                  交易金额
                </Text>
                <Text fontSize="md" color="red.500" fontWeight="600">
                  {toCurrency(+dateBetData?.bet_money)}
                </Text>
              </Box>
            </SimpleGrid>
            <Stack px="15px">
              {dateBetData?.list.map((t, i) => (
                <HStack
                  key={i}
                  bg="contentBg.500"
                  shadow="md"
                  p="10px 15px"
                  fontSize="sm"
                  color="gray.400"
                  borderRadius="md"
                  onClick={() => router.push(`/bet-rec/${t.date}`)}
                >
                  <SimpleGrid
                    columns={2}
                    w="100%"
                    spacingX="20px"
                    spacingY="5px"
                  >
                    <Text w="100px" fontWeight="600" color="#fff">
                      {t.date}
                    </Text>
                    <Flex>
                      投资结算：
                      <Text as="span" fontWeight="600" color="pink.500">
                        {toCurrency(t.win_money)}
                      </Text>
                    </Flex>
                    <Text>
                      实际损益：
                      <Text as="span" fontWeight="600" color="green.500">
                        {toCurrency(t.profit)}
                      </Text>
                    </Text>

                    <Text>
                      交易金额：
                      <Text as="span" fontWeight="600" color="#fff">
                        {toCurrency(t.bet_money)}
                      </Text>
                    </Text>
                  </SimpleGrid>
                  <Spacer />
                  <IoIosArrowForward />
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
