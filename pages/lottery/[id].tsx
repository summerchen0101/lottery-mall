import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button, IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import numeral from 'numeral'
import React from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiCurrencyDollar, HiSpeakerphone, HiUpload } from 'react-icons/hi'

function lottery() {
  const { useGoodsList, useCurrentQishu, useUserProfile } = useService()
  const router = useRouter()
  const { toCurrency } = useTransfer()
  const { data: goodRes } = useGoodsList(+(router.query.id as string))
  const { data: qishuRes } = useCurrentQishu(+(router.query.id as string))
  const { data: profileRes } = useUserProfile()

  return (
    <Layout>
      <HeaderTitleBar title={qishuRes?.data.lottery_name} />
      <Box p="20px" flex="1" overflowY="auto">
        {profileRes && (
          <Flex justify="space-between">
            <HStack fontSize="lg" spacing="20px">
              <Text color="gray.600" fontWeight="600">
                {profileRes.data.username}
              </Text>
              <Text color="purple.600" fontWeight="600">
                <Icon
                  as={BiDollar}
                  fontSize="20px"
                  fontWeight="bold"
                  color="purple.600"
                />
                {toCurrency(profileRes.data.money)}
              </Text>
            </HStack>
            <HStack>
              <IconButton
                aria-label="news"
                icon={<HiSpeakerphone />}
                size="sm"
                colorScheme="pink"
                fontSize="20px"
              />
              <IconButton
                aria-label="recharge"
                icon={<HiCurrencyDollar />}
                size="sm"
                colorScheme="pink"
                fontSize="20px"
              />
              <IconButton
                aria-label="withdraw"
                icon={<HiUpload />}
                size="sm"
                colorScheme="pink"
                fontSize="20px"
              />
            </HStack>
          </Flex>
        )}
        {qishuRes && (
          <Box
            bg="purple.100"
            mt="15px"
            borderRadius="md"
            p="15px"
            mb="10px"
            shadow="md"
            border="2px solid #eee"
          >
            <Flex
              justify="space-between"
              mb="10px"
              color="gray.600"
              fontWeight="600"
            >
              <Text>距第 {qishuRes.data.next_qishu} 訂單結帳</Text>
              <Text>
                {numeral(Math.floor(qishuRes.data.countdown / 60)).format('00')}
                :{numeral(qishuRes.data.countdown % 60).format('00')}
              </Text>
            </Flex>
            <Heading mb="15px" color="purple.600">
              {qishuRes.data.lottery_name}
            </Heading>
            <HStack>
              {qishuRes.data.numbers.map((t) => (
                <Circle
                  key={t}
                  size="35px"
                  bg="purple.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="20px"
                  shadow="lg"
                  border="2px solid #eee"
                >
                  {t}
                </Circle>
              ))}
            </HStack>
          </Box>
        )}
        <SimpleGrid columns={3} spacing="10px">
          <Button
            colorScheme="pink"
            onClick={() => router.push('/bet-rec')}
            mb="15px"
            border="2px solid #eee"
            shadow="lg"
          >
            抢购纪录
          </Button>
          <Button
            colorScheme="purple"
            onClick={() => router.push('/opened-rec')}
            mb="15px"
            border="2px solid #eee"
            shadow="lg"
          >
            结帐纪录
          </Button>
          <Button
            colorScheme="purple"
            onClick={() => router.push('/rank')}
            mb="15px"
            border="2px solid #eee"
            shadow="lg"
          >
            排行榜
          </Button>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing="20px">
          {goodRes?.data.map((t) => (
            <Box key={t.id} p="20px" borderRadius="md" bg="white" shadow="md">
              <Image src={`${process.env.apiBaseUrl}/${t.pic_icon}`} />
              <Text color="gray.500">{t.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default lottery
