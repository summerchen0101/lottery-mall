import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType, WithdrawStatus } from '@/lib/enums'
import { withdrawStatusOpts } from '@/lib/options'
import useWithdrawLog from '@/service/useWithdrawLog'
import useDateRange from '@/utils/useDateRange'
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
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import React from 'react'

function WithdrawLogPopup({ dateType }: { dateType: DateRangeType }) {
  const [visible, setVisible] = usePopupContext('withdrawLog')
  const { toCurrency, toOptionName } = useTransfer()
  const [startM, endM] = useDateRange(dateType)
  const { withdrawList, isLoading } = useWithdrawLog(
    visible && startM.format('YYYY-MM-DD'),
    visible && endM.format('YYYY-MM-DD'),
  )

  const onClose = () => setVisible(false)
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px" bg="gray.100">
        <ModalHeader>提领纪录</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="70vh" maxH="70vh" overflowY="auto">
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack spacing="15px">
              {withdrawList?.map((t) => (
                <Stack
                  key={t.id}
                  bg="white"
                  shadow="md"
                  borderLeftWidth="5px"
                  borderColor="gray.400"
                  p="15px"
                  fontSize="sm"
                  color="gray.700"
                  borderRadius="md"
                  spacing="5px"
                >
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>{t.created_at}</Text>
                    <Tag
                      variant="solid"
                      colorScheme={
                        t.status === WithdrawStatus.Success ? 'pink' : 'gray'
                      }
                    >
                      {toOptionName(withdrawStatusOpts, t.status)}
                    </Tag>
                  </HStack>
                  <HStack justify="space-between" fontWeight="bold">
                    <Text color="gray.500">单号：</Text>
                    <Text>{t.order_sn}</Text>
                  </HStack>
                  <HStack justify="space-between" fontWeight="bold">
                    <Text color="gray.500">提领金额：</Text>
                    <Text color="purple.600" fontSize="lg">
                      ¥ {t.money}
                    </Text>
                  </HStack>
                </Stack>
              ))}
            </Stack>
          )}
        </ModalBody>

        <ModalFooter mt="10px">
          <Button colorScheme="purple" w="full" onClick={onClose}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WithdrawLogPopup
