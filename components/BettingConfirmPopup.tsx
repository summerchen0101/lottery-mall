import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import { BetConfirmResponse, BetTarget } from '@/lib/types'
import useCountdown from '@/utils/useCountdown'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import BettingSuccessPopup from './BettingSuccessPopup'

interface BettingConfirmPopupProps {
  goodsId: number
  odds: number
  totalPrice: number
}

function BettingConfirmPopup({
  goodsId,
  odds,
  totalPrice,
}: BettingConfirmPopupProps) {
  const router = useRouter()
  const { toCurrency } = useTransfer()
  const [visible, setVisible] = usePopupContext('betConfirm')
  const [, setBetSuccessVisible] = usePopupContext('betSuccess')
  const lotteryId = +(router.query.id as string)
  const [confirmRes, setConfirmRes] = useState<BetConfirmResponse>()
  const { setOrderSn } = useGlobalProvider()
  const {
    useUserProfile,
    useGoodsInfo,
    useWanfaList,
    useCurrentQishu,
    doBetConfirm,
    doBetAction,
  } = useService()
  const { data: WanfaRes } = useWanfaList(lotteryId)
  const { data: QishuRes } = useCurrentQishu(lotteryId)
  const { data: ProfileRes } = useUserProfile()
  const { data: goodRes, error } = useGoodsInfo(goodsId, lotteryId)
  const { count, initCount } = useCountdown(
    QishuRes?.data.countdown - QishuRes?.data.close_time,
  )

  const betTargets: BetTarget[] = useMemo(() => {
    return WanfaRes?.data.map((t) => ({
      id: t.id,
      odds: 1 + odds / 100,
      bet_number: 1,
    }))
  }, [WanfaRes, odds])

  const onClose = () => {
    setVisible(false)
  }

  const onSubmit = async () => {
    try {
      const res = await doBetAction({
        bet_list: betTargets,
        lottery_id: lotteryId,
        goods_id: goodsId,
        qishu: QishuRes?.data.next_qishu,
      })
      setOrderSn(res.order_sn)
      setBetSuccessVisible(true)
      setVisible(false)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchConfirmInfo = async () => {
    try {
      const res = await doBetConfirm({
        bet_list: betTargets,
        lottery_id: lotteryId,
        goods_id: goodsId,
        qishu: QishuRes?.data.next_qishu,
      })
      setConfirmRes(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    count === 0 && setVisible(false)
  }, [count])

  useEffect(() => {
    if (visible) {
      initCount()
      fetchConfirmInfo()
    }
  }, [visible])

  // 結帳倒數時間即關閉彈窗
  useEffect(() => {
    if (QishuRes?.data.close_time >= QishuRes?.data.countdown) {
      setVisible(false)
    }
  }, [QishuRes])

  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader justify="center">
          <HStack>
            <Text>交易确认</Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              {count} 秒后结算
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="600" fontSize="lg" mb="15px">
            {goodRes?.data.name}{' '}
          </Text>
          <Stack>
            <HStack>
              <Text>總計金額</Text>
              <Text color="pink.500" fontSize="2xl" fontWeight="bold">
                ¥ {totalPrice}
              </Text>
            </HStack>
            <Stack fontSize="sm" color="gray.500" align="flex-end">
              <HStack justify="space-between">
                <Text>预估获利：</Text>
                <Text fontWeight="bold">
                  ¥ {toCurrency(confirmRes?.data.profit)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text>可用余额：</Text>
                <Text fontWeight="bold">
                  ¥ {toCurrency(ProfileRes?.data.money)}
                </Text>
              </HStack>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter mt="10px">
          <HStack>
            <Button colorScheme="gray" onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="pink" onClick={onSubmit}>
              确认
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingConfirmPopup
