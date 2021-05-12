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
import useTransfer from '@/utils/useTransfer'
import { Button, IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { BiDollar } from 'react-icons/bi'
import { HiCurrencyDollar, HiSpeakerphone, HiUpload } from 'react-icons/hi'

function lottery() {
  const [, setBettingVisible] = useBetInfoContext().betting
  const [, setGoodsId] = useBetInfoContext().goodsId
  const router = useRouter()
  const { toCurrency, toCountDownTimer } = useTransfer()
  const { goodsList } = useGoodsList()
  const { data: qishuData } = useCurrentQishu()
  const { userInfo } = useUserInfo()
  const acoutingCountDown = useMemo(() => {
    if (qishuData?.countdown - qishuData?.close_time > 0) {
      return toCountDownTimer(qishuData?.countdown - qishuData?.close_time)
    }
    return ''
  }, [qishuData])

  const handleGoodsClicked = async (goods: Goods) => {
    setGoodsId(goods.id)
    setBettingVisible(true)
  }

  return (
    <Layout>
      <HeaderTitleBar title={qishuData?.lottery_name} />
      <Box p="20px" flex="1" overflowY="auto">
        {userInfo && (
          <Flex justify="space-between">
            <HStack fontSize="lg" spacing="20px">
              <Text color="gray.600" fontWeight="600">
                {userInfo?.username}
              </Text>
              <Text color="purple.600" fontWeight="600">
                <Icon
                  as={BiDollar}
                  fontSize="20px"
                  fontWeight="bold"
                  color="purple.600"
                />
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
        {qishuData && (
          <HomeQishuBox
            acoutingCountDown={acoutingCountDown}
            data={qishuData}
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
          {goodsList?.map((t) => (
            <GoodsItem
              key={t.id}
              item={t}
              isAccounting={qishuData?.close_time >= qishuData?.countdown}
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
