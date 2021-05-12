import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useFaqList from '@/service/useFaqList'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'

function activity() {
  const router = useRouter()
  const { htmldecode } = useTransfer()
  const { faqList } = useFaqList()

  const faqDetail = useMemo(() => {
    return faqList?.find((t) => t.id === +router.query.id)
  }, [faqList, router])

  return (
    <Layout>
      <HeaderTitleBar back title="常见问题" />
      <Box p="20px" flex="1" overflowY="auto">
        {faqDetail && (
          <>
            <Text color="purple.600" fontSize="lg" fontWeight="600" mb="10px">
              {faqDetail.name}
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: htmldecode(faqDetail.content),
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
