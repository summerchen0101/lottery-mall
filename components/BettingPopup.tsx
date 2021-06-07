import { useBetInfoContext } from '@/context/BetInfoProvider'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsInfo from '@/service/useGoodsInfo'
import useUserInfo from '@/service/useUserInfo'
import useCountdown from '@/utils/useCountdown'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Spinner } from '@chakra-ui/spinner'
import { useToast } from '@chakra-ui/toast'
import { Chart, Interval, Line, Point, Tooltip } from 'bizcharts'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'

function BettingPopup() {
  const router = useRouter()
  const { toNumString } = useHelper()
  const { toCurrency } = useTransfer()
  const [visible, setVisible] = useBetInfoContext().betting
  const [, setBetConfirmVisible] = useBetInfoContext().betConfirm
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
  const [goodsId] = useBetInfoContext().goodsId
  const [, setTotalPrice] = useBetInfoContext().totalPrice
  const [odds, setOdds] = useBetInfoContext().odds
  const { userInfo } = useUserInfo()
  const { data: qishuData } = useCurrentQishu()
  const { goodsInfo, isLoading } = useGoodsInfo(goodsId)
  const priceInput = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const { countdown } = useCountdown(
    qishuData?.countdown - qishuData?.close_time,
  )

  const chart = useMemo(
    () =>
      goodsInfo?.chart.map((t) => ({
        date: t.date,
        profit: +t.profit,
        bet_total: +t.bet_total,
      })),
    [goodsInfo],
  )

  const handleSubmit = async () => {
    const value = +priceInput.current.value
    setTotalPrice(value > 0 ? value : null)
    if (!value) {
      toast({ status: 'error', title: '请输入金额' })
      return
    } else if (value < 100) {
      toast({ status: 'error', title: '最低限额为100' })
      return
    }
    setVisible(false)
    setBetConfirmVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    chart && setOdds(+_.takeRight(chart)?.[0]?.profit)
  }, [chart])

  // 结帐倒数时间即关闭弹窗
  useEffect(() => {
    if (countdown <= 0) {
      setVisible(false)
    }
  }, [countdown])

  useEffect(() => {
    setVisible(false)
  }, [router])
  useEffect(() => {
    visible && setTotalPrice(null)
  }, [visible])
  return (
    <Modal
      isOpen={visible}
      onClose={handleCancel}
      autoFocus={false}
      // scrollBehavior={scrollBehavior}
    >
      <ModalOverlay />
      <ModalContent bg="#3a3a3a" mb="0">
        <ModalBody p="15px 15px 0 15px">
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack spacing=".5rem">
              <HStack>
                <HStack
                  alignItems="flex-start"
                  flex="1"
                  bg="containerBg.500"
                  borderRadius="sm"
                  p=".3rem .5rem"
                  h="45px"
                >
                  <Text fontSize="10px">投资选择：</Text>
                  <Flex
                    fontSize="sm"
                    color="gray.400"
                    flexDir="column"
                    lineHeight="15px"
                  >
                    <Text lineHeight="18px">
                      GEM-{toNumString(goodsInfo?.number)}
                    </Text>
                    <Text>{goodsInfo?.name}</Text>
                  </Flex>
                </HStack>
                <HiArrowRight />
                <HStack
                  alignItems="flex-start"
                  flex="1"
                  bg="containerBg.500"
                  borderRadius="sm"
                  p=".3rem .5rem"
                  h="45px"
                >
                  <Text fontSize="10px">目前收益率：</Text>
                  <Text
                    fontSize="2xl"
                    lineHeight="33px"
                    color="red.500"
                    textAlign="center"
                  >
                    {odds}%
                  </Text>
                </HStack>
              </HStack>
              <Box>
                <Text fontWeight="600" color="gray.400" mb="1">
                  <Text
                    as="span"
                    display="inline-block"
                    w="10px"
                    h="10px"
                    borderRadius="50%"
                    bg="#fa4764"
                    mr="1"
                  ></Text>
                  市场行情(6小时)
                </Text>
                <Box bg="containerBg.500" p="2" mb="1">
                  <Chart autoFit height={200} data={chart}>
                    <Line position="date*profit" />
                    <Point position="date*profit" />
                    <Tooltip showCrosshairs />
                  </Chart>
                </Box>
                <Box bg="containerBg.500" p="2">
                  <Chart height={100} autoFit data={chart}>
                    <Interval position="date*bet_total" />
                    <Tooltip shared />
                  </Chart>
                </Box>
              </Box>
              <Box>
                <Text fontWeight="600" color="gray.400" mb=".5rem">
                  <Text
                    as="span"
                    display="inline-block"
                    w="10px"
                    h="10px"
                    borderRadius="50%"
                    bg="#fa4764"
                    mr="1"
                  ></Text>
                  投资金额
                </Text>
                <FormControl>
                  <HStack>
                    <Input
                      ref={priceInput}
                      w="full"
                      borderRadius="sm"
                      placeholder="请输入投资金额"
                      bg="containerBg.500"
                      borderColor="containerBg.500"
                      fontSize="0.9375rem"
                      type="number"
                      _focus={{ boxShadow: 'none', borderColor: '#bca16f' }}
                    />
                    <Button
                      w="full"
                      borderRadius="sm"
                      colorScheme="brand"
                      variant="outline"
                      fontSize="0.9375rem"
                      onClick={() => {
                        priceInput.current.value = userInfo?.money + ''
                      }}
                    >
                      余额全投
                    </Button>
                  </HStack>
                </FormControl>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.400" fontSize="md">
                    余额：
                  </Text>
                  <Text color="brand.500" fontSize="md">
                    ¥ {toCurrency(userInfo?.money)}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter px="15px" py=".8rem" as={HStack}>
          <Button
            colorScheme="brand"
            flex="1"
            borderRadius="20px"
            onClick={() => router.push('/recharge')}
          >
            立即充值
          </Button>
          <Button
            colorScheme="brand"
            flex="1"
            borderRadius="20px"
            onClick={handleSubmit}
          >
            立即抢购
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingPopup
