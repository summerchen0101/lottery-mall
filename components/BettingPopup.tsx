import { usePopupContext } from '@/context/PopupContext'
import { Wanfa } from '@/lib/types'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
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
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import BettingConfirmPopup from './BettingConfirmPopup'
interface BettingPopupProps {
  goodsId: number
  countdown: string
}

const buyCountOpts = [1, 5, 10, 20, 30, 50, 80, 100]

function BettingPopup({ goodsId, countdown }: BettingPopupProps) {
  const router = useRouter()
  const { toCurrency, toCountDownTimer } = useTransfer()
  const [visible, setVisible] = usePopupContext('betting')
  const [, setBetConfirmVisible] = usePopupContext('betConfirm')
  const [betWanfaIds, setBetWanfaIds] = useState<number[]>([])
  const [amount, setAmount] = useState<number>(1)
  const {
    useGoodsInfo,
    useWanfaList,
    useCurrentQishu,
    useUserProfile,
    doBetConfirm,
  } = useService()
  const { data: ProfileRes } = useUserProfile()
  const lotteryId = +(router.query.id as string)
  const { data: WanfaRes } = useWanfaList(lotteryId)
  const { data: QishuRes } = useCurrentQishu(lotteryId)
  const { data: goodsRes, error } = useGoodsInfo(goodsId)
  const info = goodsRes?.data
  const totalPrice = useMemo(() => {
    return info?.price * betWanfaIds.length * amount
  }, [betWanfaIds, info, amount])
  // const [] = useState()

  const categoryA = useMemo(
    () => WanfaRes?.data.filter((t) => t.category === 1),
    [WanfaRes],
  )
  const categoryB = useMemo(
    () => WanfaRes?.data.filter((t) => t.category === 2),
    [WanfaRes],
  )
  const handleSubmit = async () => {
    setBetConfirmVisible(true)
  }

  const handleWanfaClicked = (id: number) => {
    if (betWanfaIds.includes(id)) {
      setBetWanfaIds((wIds) => wIds.filter((t) => t !== id))
    } else {
      setBetWanfaIds((wIds) => [...wIds, id])
    }
  }

  // 結帳倒數時間即關閉彈窗
  useEffect(() => {
    if (QishuRes?.data.close_time >= QishuRes?.data.countdown) {
      setVisible(false)
    }
  }, [QishuRes])
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
                      ¥ {info.price}
                    </Text>
                    {/* <Tag colorScheme="red" variant="solid">
                      抢购倒数：2
                    </Tag> */}
                  </Flex>
                </Box>
              </HStack>

              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    ABCD选边
                  </Text>
                  <Tag colorScheme="yellow">
                    收益比例 1:{categoryA?.[0].odds}
                  </Tag>
                </HStack>
                <SimpleGrid columns={4} spacing="5px">
                  {categoryA.map((t) => (
                    <Button
                      size="sm"
                      key={t.id}
                      colorScheme={
                        betWanfaIds.includes(t.id) ? 'pink' : 'purple'
                      }
                      onClick={() => handleWanfaClicked(t.id)}
                    >
                      {t.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    尾号数字抢购
                  </Text>
                  <Tag colorScheme="yellow">
                    收益比例 1:{categoryB?.[0].odds}
                  </Tag>
                </HStack>
                <SimpleGrid columns={5} spacing="5px">
                  {categoryB.map((t) => (
                    <Button
                      size="sm"
                      key={t.id}
                      colorScheme={
                        betWanfaIds.includes(t.id) ? 'pink' : 'purple'
                      }
                      onClick={() => handleWanfaClicked(t.id)}
                    >
                      {t.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    抢购数量
                  </Text>
                </HStack>
                <SimpleGrid columns={5} spacing="5px">
                  {buyCountOpts.map((t) => (
                    <Button
                      size="sm"
                      key={t}
                      colorScheme={amount === t ? 'pink' : 'purple'}
                      onClick={() => setAmount(t)}
                    >
                      {t}
                    </Button>
                  ))}
                  {/* <Input size="sm" placeholder="输入" /> */}
                </SimpleGrid>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.500" fontWeight="bold" fontSize="md">
                    支付合计：
                  </Text>
                  <Text color="pink.500" fontWeight="bold" fontSize="2xl">
                    ¥ {totalPrice}
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
      <BettingConfirmPopup
        goodsId={goodsId}
        betIds={betWanfaIds}
        amount={amount}
        totalPrice={totalPrice}
      />
    </Modal>
  )
}

export default BettingPopup
