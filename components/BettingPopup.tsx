import { useBetInfoContext } from '@/context/BetInfoProvider'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Tag } from '@chakra-ui/tag'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
interface BettingPopupProps {
  countdown: string
}

function BettingPopup({ countdown }: BettingPopupProps) {
  const router = useRouter()
  const { toCurrency, toCountDownTimer } = useTransfer()
  const [visible, setVisible] = useBetInfoContext().betting
  const [, setBetConfirmVisible] = useBetInfoContext().betConfirm
  const [goodsId] = useBetInfoContext().goodsId
  const [totalPrice, setTotalPrice] = useBetInfoContext().totalPrice
  const [odds, setOdds] = useBetInfoContext().odds
  const { useGoodsInfo, useCurrentQishu, useUserProfile } = useService()
  const { data: ProfileRes } = useUserProfile()
  const lotteryId = +(router.query.id as string)
  const { data: QishuRes } = useCurrentQishu(lotteryId)
  const { data: goodsRes, error } = useGoodsInfo(goodsId, lotteryId)
  const info = goodsRes?.data
  // const odds = useMemo(() => +_.takeRight(info?.chart)?.[0]?.profit, [info])
  const handleSubmit = async () => {
    setVisible(false)
    setBetConfirmVisible(true)
  }

  useEffect(() => {
    info && setOdds(+_.takeRight(info?.chart)?.[0]?.profit)
  }, [info])

  // 结帐倒数时间即关闭弹窗
  useEffect(() => {
    if (QishuRes?.data.close_time >= QishuRes?.data.countdown) {
      setVisible(false)
    }
  }, [QishuRes])

  useEffect(() => {
    setVisible(false)
  }, [router])
  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)} autoFocus={false}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader justify="center">
          <Tag colorScheme="red" variant="solid">
            抢购倒数：{countdown}
          </Tag>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {info && (
            <Stack spacing="15px">
              <HStack>
                <Image
                  src={`${process.env.apiBaseUrl}/${info.pic_icon}`}
                  boxSize="100px"
                />
                <Box flex="1">
                  <Text
                    color="gray.700"
                    fontWeight="bold"
                    fontSize="lg"
                    mb="5px"
                  >
                    {info.name}
                  </Text>
                  <Flex justify="space-between" align="flex-end">
                    <Text color="pink.500" fontWeight="bold" fontSize="xl">
                      收益率：{odds}%
                    </Text>
                    {/* <Tag colorScheme="red" variant="solid">
                      抢购倒数：2
                    </Tag> */}
                  </Flex>
                </Box>
              </HStack>

              <Box>
                {/* <Text color="gray.600" fontWeight="bold">
                  投资金额
                </Text> */}
                <FormControl>
                  <FormLabel>投资金额</FormLabel>
                  <HStack>
                    <Input
                      w="full"
                      bg="gray.100"
                      onChange={(e) => setTotalPrice(+e.target.value)}
                    />
                    <Button
                      w="full"
                      colorScheme="purple"
                      onClick={() => setTotalPrice(ProfileRes?.data.money)}
                    >
                      余额全投
                    </Button>
                  </HStack>
                </FormControl>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.500" fontWeight="bold" fontSize="md">
                    支付合计：
                  </Text>
                  <Text color="pink.500" fontWeight="bold" fontSize="2xl">
                    ¥ {toCurrency(totalPrice || 0)}
                  </Text>
                </HStack>
                <Text color="gray.400" fontWeight="bold" fontSize="sm">
                  余额：{toCurrency(ProfileRes?.data.money)}
                </Text>
              </Stack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="pink">立即充值</Button>
            <Button colorScheme="pink" onClick={handleSubmit}>
              立即抢购
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingPopup
