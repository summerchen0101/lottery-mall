import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useHelper from '@/utils/useHelper'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'

function activity() {
  const router = useRouter()
  const { useNewsList } = useService()
  const { htmldecode } = useTransfer()
  const { data: res, error } = useNewsList()

  const newsDetail = useMemo(() => {
    return res?.list.find((t) => t.id === +router.query.id)
  }, [res, router])

  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <Box p="20px" flex="1" overflowY="auto">
        {newsDetail && (
          <>
            <Text color="purple.600" fontSize="lg" fontWeight="600" mb="10px">
              {newsDetail.name}
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: htmldecode(newsDetail.content),
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

export default activity
