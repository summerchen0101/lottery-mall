import { usePopupContext } from '@/context/PopupContext'
import useCountdown from '@/utils/useCountdown'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
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
import React, { useEffect } from 'react'

function BettingConfirmPopup({ goodsId }: { goodsId: number }) {
  const router = useRouter()
  const [visible, setVisible] = usePopupContext('betConfirm')
  const { useUserProfile, useGoodsInfo } = useService()
  const { data: ProfileRes } = useUserProfile()
  const { data: goodRes, error } = useGoodsInfo(goodsId)
  const { count, initCount } = useCountdown(30)

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    count === 0 && setVisible(false)
  }, [count])

  useEffect(() => {
    visible && initCount()
  }, [visible])

  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false}>
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
          <Text>您购买了{goodRes?.data.name}</Text>
          {/* <Text>支付{goodRes?.data.name}</Text> */}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="gray" onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="pink">确认</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingConfirmPopup
