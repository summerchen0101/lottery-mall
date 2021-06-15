import BettingConfirmPopup from '@/components/BettingConfirmPopup'
import BettingPopup from '@/components/BettingPopup'
import BettingSuccessPopup from '@/components/BettingSuccessPopup'
import FloatNav from '@/components/FloatNav'
import FooterNav from '@/components/FooterNav'
import GoodsItem from '@/components/GoodsItem'
import Layout from '@/components/Layout'
import LotteryCountdown from '@/components/LotteryCountdown'
import NewsPopup from '@/components/NewsPopup'
import { useBetInfoContext } from '@/context/BetInfoProvider'
import { usePopupContext } from '@/context/PopupContext'
import { Goods } from '@/lib/types'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsList from '@/service/useGoodsList'
import useUserInfo from '@/service/useUserInfo'
import useTransfer from '@/utils/useTransfer'
import { IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useRef, useState, useEffect } from 'react'

import { HiSearch, HiX } from 'react-icons/hi'

function lottery() {
  const [, setBettingVisible] = useBetInfoContext().betting
  const [, setGoodsId] = useBetInfoContext().goodsId
  const [, setNewsVisible] = usePopupContext('news')
  const [code, setCode] = useState<number>()
  const searchInput = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toCurrency } = useTransfer()
  const { goodsList, isLoading: isGoodsListLoading } = useGoodsList(code)
  const { data: qishuData } = useCurrentQishu()
  const toQishuNo = (qishu: number) => _.takeRight(qishu?.toString(), 2)
  const { userInfo } = useUserInfo()

  const handleGoodsClicked = async (goods: Goods) => {
    setGoodsId(goods.id)
    setBettingVisible(true)
  }

  const handleSearchCode = () => {
    setCode(parseInt(searchInput.current.value.trim().replace('GEM-', '')))
  }
  const handleResetSearch = () => {
    searchInput.current.value = ''
    setCode(null)
  }

  useEffect(() => {
    if (router.query.n) {
      setNewsVisible(true)
    }
  }, [router])

  return (
    <Layout>
      {/* <HeaderTitleBar title={qishuData?.lottery_name} /> */}
      {userInfo && (
        <Flex justify="space-between" p="15px" bg="containerBg.500" h="80px">
          <VStack spacing="5px" align="flex-start">
            <Text fontSize="1rem" color="white" fontWeight="600">
              {userInfo?.username}
            </Text>
            <Text color="brand.500" fontWeight="600" fontSize="1.125rem">
              <Box as="span" fontSize="13px" color="#fff" mr="1">
                G币
              </Box>
              {toCurrency(userInfo?.money)}
            </Text>
          </VStack>
          <HStack spacing="1rem">
            <VStack spacing="2px" onClick={() => router.push('/news')}>
              <Center
                bg="brand.500"
                w="2rem"
                h="2rem"
                fontSize="1.4rem"
                className="ic-news iconfont"
                color="#fff"
                borderRadius="50%"
              ></Center>
              <Text fontSize="0.8125rem" color="#fff">
                消息
              </Text>
            </VStack>
            <VStack spacing="2px" onClick={() => router.push('/recharge')}>
              <Center
                bg="brand.500"
                w="2rem"
                h="2rem"
                fontSize="1.4rem"
                className="ic-deposit iconfont"
                color="#fff"
                borderRadius="50%"
              ></Center>
              <Text fontSize="0.8125rem" color="#fff">
                充值
              </Text>
            </VStack>
            <VStack spacing="2px" onClick={() => router.push('/withdraw')}>
              <Center
                bg="brand.500"
                w="2rem"
                h="2rem"
                fontSize="1.4rem"
                className="ic-withdrawal iconfont"
                color="#fff"
                borderRadius="50%"
              ></Center>
              <Text fontSize="0.8125rem" color="#fff">
                提现
              </Text>
            </VStack>
          </HStack>
        </Flex>
      )}
      <Box p="10px 15px 65px 15px" flex="1" overflowY="auto">
        <HStack mb="2">
          <HStack
            flex="1"
            bg="contentBg.500"
            color="#fff"
            borderRadius="sm"
            p="2"
          >
            <Text fontSize="10px">
              No.{toQishuNo(qishuData?.next_qishu)}
              <br />
              订单
            </Text>
            <LotteryCountdown />
          </HStack>
          <Image w="50px" h="auto" src="/img/logo.png" />
          {/* <Icon as={HiSun} fontSize="23px" /> */}
          <HStack
            flex="1"
            bg="contentBg.500"
            color="#fff"
            borderRadius="sm"
            p="2"
          >
            <Text fontSize="10px">
              No.{toQishuNo(qishuData?.qishu)}
              <br />
              订单
            </Text>
            <Text fontSize="md" flex="1" textAlign="center">
              {qishuData?.goods.name}
            </Text>
          </HStack>
        </HStack>
        <HStack
          justify="center"
          bg="contentBg.500"
          p="2"
          borderRadius="sm"
          mb="2"
        >
          <InputGroup>
            <Input
              bg="containerBg.500"
              borderColor="containerBg.500"
              borderRadius="sm"
              fontSize="15px"
              placeholder="请输入投资代号"
              ref={searchInput}
              type="number"
              _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
            />
            {code && (
              <InputRightElement>
                <Icon as={HiX} fontSize="18px" onClick={handleResetSearch} />
              </InputRightElement>
            )}
          </InputGroup>
          <IconButton
            colorScheme="brand"
            aria-label="Search database"
            icon={<HiSearch />}
            fontSize="xl"
            onClick={handleSearchCode}
          />
        </HStack>
        {isGoodsListLoading ? (
          <Center w="full" h="50%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Box>
            {goodsList?.map((t) => (
              <GoodsItem
                key={t.id}
                item={t}
                onBetClicked={() => handleGoodsClicked(t)}
              />
            ))}
          </Box>
        )}
      </Box>
      <FooterNav />
      <FloatNav userInfo={userInfo} showAppBtn />
      <BettingPopup />
      <BettingConfirmPopup />
      <BettingSuccessPopup />
      <NewsPopup />
    </Layout>
  )
}

export default lottery
