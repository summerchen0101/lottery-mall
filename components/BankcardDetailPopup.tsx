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
import { Box, Text } from '@chakra-ui/layout'
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
      <ModalContent mx="20px">
        <ModalHeader>我的银行信息</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bankcard && (
            <>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  状态
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  color={
                    bankcard.status === BankCardStatus.On
                      ? 'pink.500'
                      : 'gray.500'
                  }
                >
                  {toOptionName(bankcardStatusOpts, bankcard.status)}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  银行卡姓名
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {bankcard.name}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  银行名称
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {bankcard.bank}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  支行名称
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {bankcard.bank_name}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  银行帐号
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {bankcard.account}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="10px">
                <Text fontSize="sm" mb="5px">
                  开户省份 / 城市
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {bankcard.province} / {bankcard.city}
                </Text>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose} w="full">
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BankcardDetailPopup
