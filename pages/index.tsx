import Layout from '@/components/Layout'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const index = () => {
  const { checkLoginStatus } = useService()
  const router = useRouter()
  const checkUserStatus = async () => {
    try {
      const res = await checkLoginStatus()
      if (res.success) {
        router.push('/lottery')
      }
    } catch (err) {}
  }
  useEffect(() => {
    checkUserStatus()
  }, [])
  return (
    <Layout>
      <Center h="100vh" bg="gray.100">
        <Spinner size="xl" thickness="3px" color="gray.400" />
      </Center>
    </Layout>
  )
}

export default index
