import BettingConfirmPopup from '@/components/BettingConfirmPopup'
import BettingPopup from '@/components/BettingPopup'
import BettingSuccessPopup from '@/components/BettingSuccessPopup'
import FooterNav from '@/components/FooterNav'
import GoodsItem from '@/components/GoodsItem'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import HomeQishuBox from '@/components/HomeQishuBox'
import Layout from '@/components/Layout'
import BetInfoProvider, { useBetInfoContext } from '@/context/BetInfoProvider'
import { usePopupContext } from '@/context/PopupContext'
import { Goods } from '@/lib/types'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button, IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiCurrencyDollar, HiSpeakerphone, HiUpload } from 'react-icons/hi'

function lottery() {
  const [, setBettingVisible] = useBetInfoContext().betting
  const [, setGoodsId] = useBetInfoContext().goodsId
  const { useGoodsList, useCurrentQishu, useUserProfile } = useService()
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

  const handleGoodsClicked = async (goods: Goods) => {
    setGoodsId(goods.id)
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
      <BettingPopup countdown={acoutingCountDown} />
      <BettingConfirmPopup />
      <BettingSuccessPopup />
    </Layout>
  )
}

export default lottery
