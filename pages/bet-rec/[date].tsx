import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { BetRecStatus } from '@/lib/enums'
import { betRecOpts } from '@/lib/options'
import { BetRec } from '@/lib/types'
import useBetRec from '@/service/useBetRec'
import useTransfer from '@/utils/useTransfer'
import { Image } from '@chakra-ui/image'
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function betRec() {
  const router = useRouter()
  const { toCurrency, toOptionName } = useTransfer()
  const date = router.query.date as string
  const { loadingSpinner } = useLoaderProvider()
  const { betRecData, isLoading } = useBetRec(date, date)
  // const toStatusTag = (item: BetRec) => {

  //   if(item.status)
  // }
  return (
    <Layout>
      <HeaderTitleBar back title="下单纪录" />
      <Box pb="110px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
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
                  总抢购金额
                </Text>
                <Text fontSize="md" color="red.500" fontWeight="600">
                  {toCurrency(+betRecData?.bet_money)}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="#fff">
                  抢购成功(笔)
                </Text>
                <Text fontSize="md" color="red.500" fontWeight="600">
                  {toCurrency(+betRecData?.win, 0)}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="#fff">
                  总收益
                </Text>
                <Text fontSize="md" color="pink.500" fontWeight="600">
                  {toCurrency(+betRecData?.profit)}
                </Text>
              </Box>
            </SimpleGrid>
            <Stack spacing="15px" p="15px">
              {betRecData?.list.map((t) => (
                <HStack
                  key={t.id}
                  justify="space-between"
                  bg="contentBg.500"
                  opacity={t.is_lose_win ? 1 : 0.6}
                  shadow="md"
                  fontWeight="500"
                  p="10px 15px"
                >
                  <Image
                    src={`${process.env.apiBaseUrl}/${t.pic_icon}`}
                    boxSize="100px"
                    objectFit="cover"
                  />
                  <Box flex="1">
                    <Flex justify="space-between">
                      <Text fontSize="sm" color="gray.400">
                        {t.lottery}
                      </Text>
                      <Tag
                        variant="solid"
                        borderRadius="4px"
                        colorScheme={t.is_lose_win ? 'green' : 'red'}
                      >
                        {t.status === BetRecStatus.Finish
                          ? t.is_lose_win
                            ? '抢购成功'
                            : '抢购失败'
                          : toOptionName(betRecOpts, t.status)}
                      </Tag>
                    </Flex>

                    <Text color="#fff">{t.name}</Text>

                    <HStack justify="space-between">
                      <Text color="#f9c54f" fontSize="sm">
                        G币 {toCurrency(t.total_price)}
                      </Text>
                      <Text color="brand.500" fontSize="sm" fontWeight="600">
                        收益：
                        <Text fontSize="md" as="span">
                          {toCurrency(t.profit)}
                        </Text>
                      </Text>
                    </HStack>
                    <HStack
                      justify="space-between"
                      color="gray.400"
                      alignItems="center"
                    >
                      <Text fontSize="sm">订单详情：{t.bet_values}</Text>
                      <Text fontSize="xs">{t.created_at}</Text>
                    </HStack>
                  </Box>
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
