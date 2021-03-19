import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activity() {
  const router = useRouter()
  const { useActivity } = useService()
  const { htmldecode } = useTransfer()
  const { data: res, error } = useActivity(+(router.query.id as string))

  return (
    <Layout>
      <HeaderTitleBar back title="優惠活動" />
      {res && (
        <Box p="20px" flex="1" overflowY="auto">
          <Text color="purple.600" fontSize="lg" fontWeight="600" mb="10px">
            {res.data.title}
          </Text>
          <Box
            dangerouslySetInnerHTML={{ __html: htmldecode(res.data.content) }}
            bg="white"
            borderRadius="md"
            shadow="md"
            color="gray.500"
            p="15px"
            minH="550px"
          />
        </Box>
      )}
      <FooterNav />
    </Layout>
  )
}

export default activity
