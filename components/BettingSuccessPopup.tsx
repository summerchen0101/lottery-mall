import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useBetSuccess from '@/service/useBetSuccess'
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

function BettingSuccessPopup() {
  const router = useRouter()
  const [visible, setVisible] = useBetInfoContext().betSuccess
  const { orderSn } = useGlobalProvider()
  const { betInfo } = useBetSuccess(visible && orderSn)

  const onClose = () => setVisible(false)

  useEffect(() => {
    setVisible(false)
  }, [router])
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader>交易成功</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify="space-between">
            <Text>單號</Text>
            <Text>{betInfo?.order_sn}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>結算時間</Text>
            <Text>{betInfo?.created_at}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>搶購專區</Text>
            <Text>{betInfo?.lottery_name}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>搶購商品</Text>
            <Text>{betInfo?.goods_name}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>商品分類</Text>
            <Text>{betInfo?.wanfa}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>金額</Text>
            <Text>{betInfo?.total}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>預估獲利</Text>
            <Text>{betInfo?.profit}</Text>
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
