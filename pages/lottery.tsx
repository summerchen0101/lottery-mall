import BettingConfirmPopup from '@/components/BettingConfirmPopup'
import BettingPopup from '@/components/BettingPopup'
import BettingSuccessPopup from '@/components/BettingSuccessPopup'
import FooterNav from '@/components/FooterNav'
import GoodsItem from '@/components/GoodsItem'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import HomeQishuBox from '@/components/HomeQishuBox'
import Layout from '@/components/Layout'
import { useBetInfoContext } from '@/context/BetInfoProvider'
import { Goods } from '@/lib/types'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsList from '@/service/useGoodsList'
import useUserInfo from '@/service/useUserInfo'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Button, IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { BiDollar } from 'react-icons/bi'
import {
  HiCurrencyDollar,
  HiSearch,
  HiSpeakerphone,
  HiSun,
  HiUpload,
} from 'react-icons/hi'

function lottery() {
  const [, setBettingVisible] = useBetInfoContext().betting
  const [, setGoodsId] = useBetInfoContext().goodsId

  const router = useRouter()
  const { toCurrency } = useTransfer()
  const { secToTimer } = useHelper()
  const { goodsList, isLoading } = useGoodsList()
  const { data: qishuData } = useCurrentQishu()
  const toQishuNo = (qishu: number) => _.takeRight(qishu?.toString(), 2)
  const [countdown, setCountdown] = useState(
    qishuData?.countdown - qishuData?.close_time,
  )
  const { userInfo } = useUserInfo()

  useEffect(() => {
    setCountdown(qishuData?.countdown - qishuData?.close_time)
    const interval = setInterval(
      () => setCountdown((sec) => (sec ? sec - 1 : 0)),
      1000,
    )
    return () => {
      clearInterval(interval)
    }
  }, [qishuData])

  const handleGoodsClicked = async (goods: Goods) => {
    setGoodsId(goods.id)
    setBettingVisible(true)
  }

  return (
    <Layout>
      {/* <HeaderTitleBar title={qishuData?.lottery_name} /> */}
      {userInfo && (
        <Flex justify="space-between" p="3" bg="purple.500">
          <HStack fontSize="lg" spacing="20px">
            <Text color="white" fontWeight="600">
              {userInfo?.username}
            </Text>
            <Text color="purple.100" fontWeight="600">
              <Icon as={BiDollar} fontSize="20px" fontWeight="bold" />
              {toCurrency(userInfo?.money)}
            </Text>
          </HStack>
          <HStack>
            <IconButton
              aria-label="news"
              icon={<HiSpeakerphone />}
              size="sm"
              colorScheme="pink"
              fontSize="20px"
              onClick={() => router.push('/news')}
            />
            <IconButton
              aria-label="recharge"
              icon={<HiCurrencyDollar />}
              size="sm"
              colorScheme="pink"
              fontSize="20px"
              onClick={() => router.push('/recharge')}
            />
            <IconButton
              aria-label="withdraw"
              icon={<HiUpload />}
              size="sm"
              colorScheme="pink"
              fontSize="20px"
              onClick={() => router.push('/withdraw')}
            />
          </HStack>
        </Flex>
      )}
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <HStack mb="2">
              <HStack
                flex="1"
                bg="gray.300"
                color="gray.500"
                borderRadius="md"
                p="1"
              >
                <Text fontSize="10px">
                  No.{toQishuNo(qishuData?.next_qishu)}
                  <br />
                  订单
                </Text>
                <Text
                  fontSize="xl"
                  flex="1"
                  textAlign="center"
                >{`00:${secToTimer(countdown)}`}</Text>
              </HStack>
              <Icon as={HiSun} fontSize="23px" />
              <HStack
                flex="1"
                bg="gray.300"
                color="gray.500"
                borderRadius="md"
                p="1"
              >
                <Text fontSize="10px">
                  No.{toQishuNo(qishuData?.qishu)}
                  <br />
                  订单
                </Text>
                <Text fontSize="xl" flex="1" textAlign="center">
                  {qishuData?.goods.name}
                </Text>
              </HStack>
            </HStack>
            <HStack
              justify="center"
              bg="purple.500"
              p="2"
              borderRadius="md"
              mb="2"
            >
              <Input bg="gray.200" placeholder="请输入投资代号" />
              <IconButton
                colorScheme="pink"
                aria-label="Search database"
                icon={<HiSearch />}
                fontSize="xl"
              />
            </HStack>
            <Box>
              {goodsList?.map((t) => (
                <GoodsItem
                  key={t.id}
                  item={t}
                  isAccounting={qishuData?.close_time >= qishuData?.countdown}
                  onBetClicked={() => handleGoodsClicked(t)}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
      <FooterNav />
      <BettingPopup countdown={countdown} />
      <BettingConfirmPopup countdown={countdown} />
      <BettingSuccessPopup />
    </Layout>
  )
}

export default lottery
