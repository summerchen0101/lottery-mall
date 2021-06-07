import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import ListItem from '@/components/ListItem'
import { NoticeType } from '@/lib/enums'
import useNoticeList from '@/service/useNoticeList'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiChevronRight } from 'react-icons/hi'

function faq() {
  const { noticeList, isLoading } = useNoticeList(NoticeType.Faq)
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="常见问题" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="15px">
            {noticeList?.map((t) => (
              <ListItem key={t.id} onClick={() => router.push(`/faq/${t.id}`)}>
                {t.name}
              </ListItem>
            ))}
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default faq
