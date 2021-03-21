import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
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
import React from 'react'

function BettingSuccessPopup() {
  const { useBetSuccess } = useService()
  const [visible, setVisible] = usePopupContext('betSuccess')
  const { orderSn } = useGlobalProvider()
  const { data: SuccessRes, error } = useBetSuccess(visible && orderSn)

  const onClose = () => setVisible(false)
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader>交易成功</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify="space-between">
            <Text>單號</Text>
            <Text>{SuccessRes?.data.order_sn}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>結算時間</Text>
            <Text>{SuccessRes?.data.created_at}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>搶購專區</Text>
            <Text>{SuccessRes?.data.lottery_name}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>搶購商品</Text>
            <Text>{SuccessRes?.data.goods_name}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>商品分類</Text>
            <Text>{SuccessRes?.data.wanfa}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>金額</Text>
            <Text>{SuccessRes?.data.total}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>預估獲利</Text>
            <Text>{SuccessRes?.data.profit}</Text>
          </HStack>
        </ModalBody>

        <ModalFooter mt="10px">
          <Button colorScheme="pink" w="full" onClick={onClose}>
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingSuccessPopup
