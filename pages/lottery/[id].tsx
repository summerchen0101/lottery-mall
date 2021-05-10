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
import React, { useCallback, useMemo, useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiCurrencyDollar, HiSpeakerphone, HiUpload } from 'react-icons/hi'
import _ from 'lodash'
import GoodsItem from '@/components/GoodsItem'
import HomeQishuBox from '@/components/HomeQishuBox'
import { Goods } from '@/lib/types'

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
  const toQishuNo = (qishu: number) => _.takeRight(qishu.toString(), 2)
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

  const handleGoodsClicked = async (goods: Goods) => {
    setCurrentGoodsId(goods.id)
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
          <HomeQishuBox
            acoutingCountDown={acoutingCountDown}
            data={qishuRes.data}
          />
        )}
        <SimpleGrid columns={3} spacing="10px">
          <Button
            colorScheme="pink"
            onClick={() => router.push('/bet-rec')}
            mb="15px"
            border="2px solid #eee"
            shadow="lg"
          >
            更多纪录
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
            <GoodsItem
              key={t.id}
              item={t}
              isAccounting={
                qishuRes?.data.close_time >= qishuRes?.data.countdown
              }
              onBetClicked={() => handleGoodsClicked(t)}
            />
          ))}
        </SimpleGrid>
      </Box>
      <FooterNav />
      <BettingPopup goodsId={currentGoodsId} countdown={acoutingCountDown} />
    </Layout>
  )
}

export default lottery
