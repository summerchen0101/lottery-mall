import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useBetRec from '@/service/useBetRec'
import { Image } from '@chakra-ui/image'
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function betRec() {
  const router = useRouter()
  const date = router.query.date as string
  const { loadingSpinner } = useLoaderProvider()
  const { betRecData, isLoading } = useBetRec(date, date)
  return (
    <Layout>
      <HeaderTitleBar back title="下单纪录" />
      <Box p="20px" flex="1" overflowY="auto">
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
                  总抢购金额
                </Text>
                <Text fontSize="xl" color="purple.600" fontWeight="600">
                  {betRecData?.bet_money}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  抢购成功
                </Text>
                <Text fontSize="xl" color="purple.600" fontWeight="600">
                  {betRecData?.win}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  总收益
                </Text>
                <Text fontSize="xl" color="pink.500" fontWeight="600">
                  {betRecData?.profit}
                </Text>
              </Box>
            </SimpleGrid>
            <Stack spacing="15px">
              {betRecData?.list.map((t) => (
                <HStack
                  key={t.id}
                  justify="space-between"
                  bg="white"
                  opacity={t.is_lose_win ? 1 : 0.6}
                  shadow="md"
                  fontWeight="500"
                  p="10px"
                  borderLeftWidth="3px"
                  borderColor="purple.500"
                >
                  <Image
                    src={`${process.env.apiBaseUrl}/${t.pic_icon}`}
                    boxSize="100px"
                    objectFit="cover"
                  />
                  <Box flex="1">
                    <Flex justify="space-between">
                      <Text fontSize="sm" color="gray.600">
                        {t.lottery}
                      </Text>
                      <Tag
                        variant="solid"
                        borderRadius="4px"
                        colorScheme={t.is_lose_win ? 'pink' : 'gray'}
                      >
                        {t.is_lose_win ? '抢购成功' : '抢购失败'}
                      </Tag>
                    </Flex>
                    <Text color="purple.600">{t.name}</Text>
                    <HStack justify="space-between">
                      <Text color="gray.500" fontSize="lg">
                        ¥ {t.total_price}
                      </Text>
                      <Text color="pink.500" fontSize="sm" fontWeight="600">
                        收益：
                        <Text fontSize="xl" as="span">
                          {t.profit}
                        </Text>
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500" fontSize="xs">
                        订单详情：{t.bet_values}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {t.created_at}
                      </Text>
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
