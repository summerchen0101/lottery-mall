import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { BetConfirmResponse, BetTarget } from '@/lib/types'
import useBetAction from '@/service/useBetAction'
import useBetConfirm from '@/service/useBetConfirm'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsInfo from '@/service/useGoodsInfo'
import useUserInfo from '@/service/useUserInfo'
import useWanfaList from '@/service/useWanfaList'
import useCountdown from '@/utils/useCountdown'
import useHelper from '@/utils/useHelper'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import {
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

function BettingConfirmPopup() {
  const router = useRouter()
  const { toCurrency } = useTransfer()
  const { secToTimer } = useHelper()
  const [, setBetSuccessVisible] = useBetInfoContext().betSuccess
  const [odds] = useBetInfoContext().odds
  const [goodsId] = useBetInfoContext().goodsId
  const [totalPrice] = useBetInfoContext().totalPrice
  const [visible, setVisible] = useBetInfoContext().betConfirm
  const { setOrderSn } = useGlobalProvider()
  const { wanfaList } = useWanfaList()
  const { data: qishuData } = useCurrentQishu()
  const { userInfo } = useUserInfo()
  const { goodsInfo } = useGoodsInfo(goodsId)
  const { countdown } = useCountdown(
    qishuData?.countdown - qishuData?.close_time,
  )
  const { handler: doBetAction, isLoading, orderSn } = useBetAction()
  const { handler: doBetConfirm, data: confirmData } = useBetConfirm()
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
      doBetAction({
        bet_list: betTargets,
        lottery_id: 6,
        goods_id: goodsId,
        qishu: qishuData?.next_qishu,
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setOrderSn(orderSn)
    setBetSuccessVisible(true)
    setVisible(false)
  }, [orderSn])

  const fetchConfirmInfo = async () => {
    try {
      doBetConfirm({
        bet_list: betTargets,
        lottery_id: 6,
        goods_id: goodsId,
        qishu: qishuData?.next_qishu,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (visible) {
      fetchConfirmInfo()
    }
  }, [visible])

  // 結帳倒數時間即關閉彈窗
  useEffect(() => {
    if (countdown <= 0) {
      setVisible(false)
    }
  }, [countdown])

  useEffect(() => {
    setVisible(false)
  }, [router])

  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent className="modal__content">
        <ModalHeader justify="center" className="modal__header">
          <Flex>
            <Text color="#fff">交易确认</Text>
            <Spacer />
            <Tag colorScheme="red" variant="solid" mr="1.75rem">
              抢购倒数：{secToTimer(countdown)}
            </Tag>
          </Flex>
          <Divider mt="4" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal__body">
          <Text color="#fff" textAlign="center" fontSize="xl" mb="15px">
            {goodsInfo?.name}
          </Text>
          <SimpleGrid columns={2} spacingY=".5rem" color="#fff">
            <Text>總計金額：</Text>
            <Text textAlign="right">¥ {totalPrice}</Text>
            <Text>预估获利：</Text>
            <Text textAlign="right">¥ {toCurrency(confirmData?.profit)}</Text>
            <Text>可用余额：</Text>
            <Text textAlign="right">¥ {toCurrency(userInfo?.money)}</Text>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter className="modal__footer" mt="10px" as={HStack}>
          <button className="btnbase outline_btn" onClick={onClose}>
            取消
          </button>
          <Button
            w="100%"
            borderRadius="25px"
            colorScheme="brand"
            h="36px"
            onClick={onSubmit}
            disabled={isLoading}
          >
            确认
            {isLoading && <Spinner ml="1" />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingConfirmPopup
