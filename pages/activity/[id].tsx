import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useActivity from '@/service/useActivity'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, Center, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activity() {
  const router = useRouter()
  const { htmldecode } = useTransfer()
  const { activity, isLoading } = useActivity(+(router.query.id as string))

  return (
    <Layout>
      <HeaderTitleBar back title="優惠活動" />
      <Box className="layout" flex="1" overflowY="auto">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <>
            <Text color="brand.500" fontSize="lg" fontWeight="600" mb="10px">
              {activity?.title}
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: htmldecode(activity?.content),
              }}
              color="#fff"
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
