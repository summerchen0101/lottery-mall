import Layout from '@/components/Layout'
import useRequest from '@/utils/useRequest'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const IndexPage = () => {
  const API = useRequest()
  const router = useRouter()
  const checkUserStatus = async () => {
    try {
      await API.checkLogin()
      router.push('/home')
    } catch (err) {}
  }
  useEffect(() => {
    checkUserStatus()
  }, [])
  return (
    <Layout>
      <Center h="100vh" bg="gray.100"></Center>
    </Layout>
  )
}

export default IndexPage
