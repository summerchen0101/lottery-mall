import Layout from '@/components/Layout'
import useRequest from '@/utils/useRequest'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const IndexPage = () => {
  return (
    <Layout>
      <Center h="100vh" bg="gray.100">
        <h1>Hello World</h1>
      </Center>
    </Layout>
  )
}

export default IndexPage
