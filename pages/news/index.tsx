import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { NoticeType } from '@/lib/enums'
import useNoticeList from '@/service/useNoticeList'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiChevronRight } from 'react-icons/hi'

function news() {
  const { noticeList, isLoading } = useNoticeList(NoticeType.News)
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <Box pb="55px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="0">
            {noticeList?.map((t) => (
              <HStack
                h="60px"
                px="15px"
                justify="space-between"
                borderBottom="1px"
                key={t.id}
                onClick={() => router.push(`/news/${t.id}`)}
              >
                <Text fontSize="lg" fontWeight="600" color="#fff">
                  {t.name}
                </Text>
                <Icon as={HiChevronRight} fontSize="24px" color="#fff" />
              </HStack>
            ))}
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default news
