import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

export default function service() {
  const router = useRouter()
  const serviceLink = router.query?.service as string
  return (
    <Layout>
      <HeaderTitleBar back title="客服中心" />
      <Box as="iframe" src={serviceLink} h="full" />
    </Layout>
  )
}
