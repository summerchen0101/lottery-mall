import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useNewsList from '@/service/useNewsList'
import useService from '@/utils/useService'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiChevronRight } from 'react-icons/hi'

function news() {
  const { newsList } = useNewsList()
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <Box p="20px" flex="1" overflowY="auto">
        <Stack spacing="15px">
          {newsList?.map((t) => (
            <HStack
              bg="white"
              h="60px"
              px="15px"
              borderRadius="md"
              shadow="md"
              justify="space-between"
              key={t.id}
              borderLeftWidth="4px"
              borderColor="purple.600"
              onClick={() => router.push(`/news/${t.id}`)}
            >
              <Text fontSize="lg" fontWeight="600" color="gray.700">
                {t.name}
              </Text>
              <Icon
                as={HiChevronRight}
                fontWeight="600"
                fontSize="23px"
                color="purple.600"
              />
            </HStack>
          ))}
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default news
