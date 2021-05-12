import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useActivity from '@/service/useActivity'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activity() {
  const router = useRouter()
  const { htmldecode } = useTransfer()
  const { activity } = useActivity(+(router.query.id as string))

  return (
    <Layout>
      <HeaderTitleBar back title="優惠活動" />
      <Box p="20px" flex="1" overflowY="auto">
        <Text color="purple.600" fontSize="lg" fontWeight="600" mb="10px">
          {activity?.title}
        </Text>
        <Box
          dangerouslySetInnerHTML={{ __html: htmldecode(activity?.content) }}
          bg="white"
          borderRadius="md"
          shadow="md"
          color="gray.500"
          p="15px"
          minH="550px"
        />
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default activity
