import BettingConfirmPopup from '@/components/BettingConfirmPopup'
import BettingPopup from '@/components/BettingPopup'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { usePopupContext } from '@/context/PopupContext'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import numeral from 'numeral'
import React, { useMemo, useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiCurrencyDollar, HiSpeakerphone, HiUpload } from 'react-icons/hi'

function lottery() {
  const [currentGoodsId, setCurrentGoodsId] = useState<number>()
  const [, setBettingVisible] = usePopupContext('betting')
  const {
    useGoodsList,
    useCurrentQishu,
    useUserProfile,
    useWanfaList,
  } = useService()
  const router = useRouter()
  const { toCurrency, toCountDownTimer } = useTransfer()
  const { data: goodRes } = useGoodsList(+(router.query.id as string))
  const { data: qishuRes } = useCurrentQishu(+(router.query.id as string))

  const { data: profileRes } = useUserProfile()
  const acoutingCountDown = useMemo(() => {
    if (qishuRes && qishuRes.data.countdown - qishuRes.data.close_time > 0) {
      return toCountDownTimer(
        qishuRes.data.countdown - qishuRes.data.close_time,
      )
    }
    return ''
  }, [qishuRes])

  const restartCountDown = useMemo(() => {
    if (qishuRes && qishuRes.data.close_time - qishuRes.data.countdown > 0) {
      return toCountDownTimer(qishuRes.data.countdown)
    }
    return ''
  }, [qishuRes])

  const handleGoodsClicked = async (id: number) => {
    setCurrentGoodsId(id)
    setBettingVisible(true)
  }

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
              {acoutingCountDown ? (
                <>
                  <Text>距第 {qishuRes.data.next_qishu} 订单结帐</Text>
                  <Text color="red.600" fontWeight="bold">
                    {acoutingCountDown}
                  </Text>
                </>
              ) : (
                <>
                  <Text color="red.500">
                    订单 {qishuRes.data.next_qishu} 结帐中
                  </Text>
                  <HStack color="red.500">
                    <Text fontWeight="bold">{restartCountDown}</Text>
                    <Text>后可下注</Text>
                  </HStack>
                </>
              )}
            </Flex>

            <Heading mb="15px" color="purple.600">
              {qishuRes.data.lottery_name}
            </Heading>
            <HStack>
              {qishuRes.data.numbers.map((t, i) => (
                <Circle
                  key={i}
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
            <Stack key={t.id} p="20px" borderRadius="md" bg="white" shadow="md">
              <Image src={`${process.env.apiBaseUrl}/${t.pic_icon}`} />
              <Text color="gray.500" fontWeight="bold" noOfLines={1}>
                {t.name}
              </Text>
              <Text color="pink.500" fontWeight="bold">
                ¥ {toCurrency(t.price, 0)}
              </Text>
              {qishuRes?.data.close_time >= qishuRes?.data.countdown ? (
                <Button disabled size="sm" w="full" colorScheme="purple">
                  结帐中
                </Button>
              ) : (
                <Button
                  size="sm"
                  w="full"
                  colorScheme="purple"
                  onClick={() => handleGoodsClicked(t.id)}
                >
                  立即购买
                </Button>
              )}
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
      <FooterNav />
      <BettingPopup goodsId={currentGoodsId} countdown={acoutingCountDown} />
    </Layout>
  )
}

export default lottery
