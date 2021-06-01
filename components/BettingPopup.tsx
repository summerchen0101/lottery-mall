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
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
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
    <Modal isOpen={visible} onClose={handleCancel} autoFocus={false}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalBody p="4">
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack spacing="15px">
              <HStack>
                <HStack flex="1" bg="gray.200" borderRadius="md" p="2" h="40px">
                  <Text fontSize="lg" lineHeight="18px">
                    GEM-{toNumString(goodsInfo?.number)}
                  </Text>
                  <Text fontSize="sm">{goodsInfo?.name}</Text>
                </HStack>
                <HiArrowRight />
                <HStack flex="1" bg="gray.200" borderRadius="md" p="2" h="40px">
                  <Text fontSize="10px">目前收益率：</Text>
                  <Text
                    fontSize="xl"
                    lineHeight="18px"
                    color="red.500"
                    textAlign="center"
                  >
                    {odds}%
                  </Text>
                </HStack>
              </HStack>
              <Box>
                <Text fontWeight="600" color="purple.500" mb="1">
                  市场行情(6小时)
                </Text>
                <Box>
                  <Chart autoFit height={200} data={chart}>
                    <Line position="date*profit" />
                    <Point position="date*profit" />
                    <Tooltip showCrosshairs />
                  </Chart>
                  <Chart height={100} autoFit data={chart}>
                    <Interval position="date*bet_total" />
                    <Tooltip shared />
                  </Chart>
                </Box>
              </Box>
              <Box>
                <Text fontWeight="600" color="purple.500" mb="1">
                  投资金额
                </Text>
                <FormControl>
                  <HStack>
                    <Input
                      ref={priceInput}
                      w="full"
                      bg="gray.100"
                      type="number"
                    />
                    <Button
                      w="full"
                      colorScheme="purple"
                      onClick={() => setTotalPrice(userInfo?.money)}
                    >
                      余额全投
                    </Button>
                  </HStack>
                </FormControl>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.500" fontWeight="bold" fontSize="md">
                    余额：
                  </Text>
                  <Text color="pink.500" fontWeight="bold" fontSize="lg">
                    ¥ {toCurrency(userInfo?.money)}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter p="4" as={HStack}>
          <Button
            colorScheme="gray"
            flex="1"
            onClick={() => router.push('/recharge')}
          >
            立即充值
          </Button>
          <Button colorScheme="pink" flex="1" onClick={handleSubmit}>
            立即抢购
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingPopup
