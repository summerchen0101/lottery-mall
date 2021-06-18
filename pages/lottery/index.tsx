import Layout from '@/components/Layout'
import useLotteryList from '@/service/useLotteryList'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'

export default function lotteryIndex() {
  const { lotteryList } = useLotteryList()
  const router = useRouter()
  const lottery_id = useMemo(() => lotteryList?.[0].id, [lotteryList])
  useEffect(() => {
    if (lottery_id) {
      router.replace(`/lottery/${lottery_id}`)
    }
  }, [lottery_id])
  return (
    <Layout>
      <Center h="100%" bg="gray.100">
        <Spinner size="xl" thickness="3px" color="gray.400" />
      </Center>
    </Layout>
  )
}
