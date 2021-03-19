import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { Box, Center, Stack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'

function home() {
  const { useLotteryList } = useService()
  const router = useRouter()
  const { data } = useLotteryList()
  return (
    <Layout>
      <HeaderTitleBar title="大厅入口" />
      <Center h="100vh" pb="60px" bg="gray.200">
        <Box>
          <Stack spacing="20px">
            {data?.list.map((t) => (
              <Button
                key={t.id}
                colorScheme="pink"
                onClick={() => router.push(`/lottery/${t.id}`)}
              >
                {t.name}
              </Button>
            ))}
          </Stack>
        </Box>
      </Center>
      <FooterNav />
    </Layout>
  )
}

export default home
