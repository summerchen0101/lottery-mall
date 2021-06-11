import React from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Box, Divider, Text } from '@chakra-ui/layout'
import useTransfer from '@/utils/useTransfer'
import { bankcardStatusOpts } from '@/lib/options'
import { BankCardStatus } from '@/lib/enums'
import { BankCard } from '@/lib/types'
import { Button } from '@chakra-ui/button'

interface BankcardDetailPopupProps {
  isOpen: boolean
  onClose: () => void
  bankcard: BankCard
}

function BankcardDetailPopup({
  isOpen,
  onClose,
  bankcard,
}: BankcardDetailPopupProps) {
  const { toOptionName } = useTransfer()
  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent className="modal__content">
        <ModalHeader className="modal__header">我的银行信息</ModalHeader>
        <ModalCloseButton color="#fff" />
        <ModalBody className="modal__body">
          {bankcard && (
            <>
              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  状态
                </Text>
                <Text
                  fontSize="md"
                  color={
                    bankcard.status === BankCardStatus.On
                      ? 'green.500'
                      : 'gray.500'
                  }
                >
                  {toOptionName(bankcardStatusOpts, bankcard.status)}
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  银行卡姓名
                </Text>
                <Text fontSize="md" color="#fff">
                  {bankcard.name}
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  银行名称
                </Text>
                <Text fontSize="md" color="#fff">
                  {bankcard.bank}
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  支行名称
                </Text>
                <Text fontSize="md" color="#fff">
                  {bankcard.bank_name}
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  银行帐号
                </Text>
                <Text fontSize="md" color="#fff">
                  {bankcard.account}
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.2)" py="5px">
                <Text fontSize="sm" mb="5px" color="gray.400">
                  开户省份 / 城市
                </Text>
                <Text fontSize="md" color="#fff">
                  {bankcard.province} / {bankcard.city}
                </Text>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter className="modal__footer ">
          <Button
            colorScheme="brand"
            borderRadius="sm"
            onClick={onClose}
            w="full"
          >
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BankcardDetailPopup
