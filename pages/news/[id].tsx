import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useNews from '@/service/useNews'
import useNotice from '@/service/useNotice'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function newsDetail() {
  const router = useRouter()
  const { htmldecode } = useTransfer()
  const { notice, isLoading } = useNotice(+router.query.id)

  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text color="purple.600" fontSize="lg" fontWeight="600" mb="10px">
              {notice?.name}
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: htmldecode(notice?.content),
              }}
              bg="white"
              borderRadius="md"
              shadow="md"
              color="gray.500"
              p="15px"
              minH="550px"
            />
          </>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default newsDetail
