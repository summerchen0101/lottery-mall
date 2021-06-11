import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useBetSuccess from '@/service/useBetSuccess'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { Divider, HStack, Text } from '@chakra-ui/layout'
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
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

function BettingSuccessPopup() {
  const router = useRouter()
  const [visible, setVisible] = useBetInfoContext().betSuccess
  const { orderSn } = useGlobalProvider()
  const { betInfo, isLoading } = useBetSuccess(visible && orderSn)

  const onClose = () => setVisible(false)

  useEffect(() => {
    setVisible(false)
  }, [router])
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent className="modal__content">
        <ModalHeader className="modal__header">
          <Text>交易成功</Text>
          <Divider mt="4" borderColor="rgba(255,255,255,.2)" />
        </ModalHeader>
        <ModalCloseButton color="#fff" />
        <ModalBody className="modal__body" color="#fff" lineHeight="24px">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  單號
                </Text>
                <Text>{betInfo?.order_sn}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  結算時間
                </Text>
                <Text>{betInfo?.created_at}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  搶購專區
                </Text>
                <Text>{betInfo?.lottery_name}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  搶購商品
                </Text>
                <Text>{betInfo?.goods_name}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  商品分類
                </Text>
                <Text>{betInfo?.wanfa}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  金額
                </Text>
                <Text>{betInfo?.total}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text w="100px" bg="contentBg.500" textAlign="center" px="2">
                  預估獲利
                </Text>
                <Text>{betInfo?.profit}</Text>
              </HStack>
            </>
          )}
        </ModalBody>

        <ModalFooter mt="10px" className="modal__footer">
          <button className="btnbase primary_btn" onClick={onClose}>
            确认
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingSuccessPopup
