import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { BetConfirmResponse, BetTarget } from '@/lib/types'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsInfo from '@/service/useGoodsInfo'
import useUserInfo from '@/service/useUserInfo'
import useWanfaList from '@/service/useWanfaList'
import useCountdown from '@/utils/useCountdown'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { HStack, Stack, Text } from '@chakra-ui/layout'
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

function BettingConfirmPopup() {
  const router = useRouter()
  const { toCurrency } = useTransfer()
  const [, setBetSuccessVisible] = useBetInfoContext().betSuccess
  const [odds] = useBetInfoContext().odds
  const [goodsId] = useBetInfoContext().goodsId
  const [totalPrice] = useBetInfoContext().totalPrice
  const [visible, setVisible] = useBetInfoContext().betConfirm
  const [confirmRes, setConfirmRes] = useState<BetConfirmResponse>()
  const { setOrderSn } = useGlobalProvider()
  const { doBetConfirm, doBetAction } = useService()
  const { wanfaList } = useWanfaList()
  const { data: QishuData } = useCurrentQishu()
  const { userInfo } = useUserInfo()
  const { goodsInfo } = useGoodsInfo(goodsId)
  const { count, initCount } = useCountdown(
    QishuData?.countdown - QishuData?.close_time,
  )
  const betTargets: BetTarget[] = useMemo(() => {
    return wanfaList?.map((t) => ({
      id: t.id,
      odds: 1 + odds / 100,
      bet_number: totalPrice / 100,
    }))
  }, [wanfaList, odds, totalPrice])

  const onClose = () => {
    setVisible(false)
  }

  const onSubmit = async () => {
    try {
      const res = await doBetAction({
        bet_list: betTargets,
        lottery_id: 6,
        goods_id: goodsId,
        qishu: QishuData?.next_qishu,
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
        lottery_id: 6,
        goods_id: goodsId,
        qishu: QishuData?.next_qishu,
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
    if (QishuData?.close_time >= QishuData?.countdown) {
      setVisible(false)
    }
  }, [QishuData])

  useEffect(() => {
    setVisible(false)
  }, [router])

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
            {goodsInfo?.name}{' '}
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
                <Text fontWeight="bold">¥ {toCurrency(userInfo?.money)}</Text>
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
