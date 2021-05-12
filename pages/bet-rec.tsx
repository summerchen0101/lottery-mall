import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useService from '@/utils/useService'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function betRec() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const { useBetRec } = useService()
  const { data: res, error } = useBetRec()
  return (
    <Layout>
      <HeaderTitleBar back title="下单纪录" />
      <Box p="20px" flex="1" overflowY="auto">
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
              {res?.data.bet_money}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">
              抢购成功
            </Text>
            <Text fontSize="xl" color="purple.600" fontWeight="600">
              {res?.data.win}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">
              总收益
            </Text>
            <Text fontSize="xl" color="pink.500" fontWeight="600">
              {res?.data.profit}
            </Text>
          </Box>
        </SimpleGrid>
        <Stack spacing="15px">
          {res?.data.list.map((t) => (
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
                  <Text color="pink.500" fontSize="xl" fontWeight="600">
                    {t.profit}
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
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}

export default betRec
