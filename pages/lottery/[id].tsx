import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Circle,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function lottery() {
  const { useGoodsList, useCurrentQishu } = useService()
  const router = useRouter()
  const { data: goodRes } = useGoodsList(+(router.query.id as string))
  const { data: QishuRes } = useCurrentQishu(+(router.query.id as string))

  return (
    <Layout>
      <Box p="20px" bg="pink.100" h="100vh" w="100vw" overflowY="auto">
        {QishuRes && (
          <Box bg="pink.200">
            <Heading mb="20px">{QishuRes.data.lottery_name}</Heading>
            <HStack>
              {QishuRes.data.numbers.map((t) => (
                <Circle key={t} size="30px" bg="white">
                  {t}
                </Circle>
              ))}
            </HStack>
          </Box>
        )}
        <SimpleGrid columns={2} spacing="20px">
          {goodRes?.data.map((t) => (
            <Box key={t.id} p="20px" borderRadius="md" bg="white" shadow="md">
              <Image src={`${process.env.apiBaseUrl}/${t.pic_icon}`} />
              <Text color="gray.500">{t.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}

export default lottery
