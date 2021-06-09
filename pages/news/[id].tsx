import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useNotice from '@/service/useNotice'
import useTransfer from '@/utils/useTransfer'
import { Box, Center, Text } from '@chakra-ui/layout'
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
      <Box className="layout" flex="1" overflowY="auto">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <>
            <Text color="brand.500" fontSize="lg" fontWeight="600" mb="10px">
              {notice?.name}
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: htmldecode(notice?.content),
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

export default newsDetail
