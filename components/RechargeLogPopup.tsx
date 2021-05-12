import { useLoaderProvider } from '@/context/LoaderProvider'
import { usePopupContext } from '@/context/PopupContext'
import { DateRangeType, RechargeStatus } from '@/lib/enums'
import { rechargeStatusOpts } from '@/lib/options'
import useRechargeLog from '@/service/useRechargeLog'
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
import { Tag } from '@chakra-ui/tag'
import React from 'react'

function RechargeLogPopup({ dateType }: { dateType: DateRangeType }) {
  const [visible, setVisible] = usePopupContext('rechargeLog')
  const { loadingSpinner } = useLoaderProvider()
  const { toCurrency, toOptionName } = useTransfer()
  const [startM, endM] = useDateRange(dateType)
  const { rechargeList } = useRechargeLog(
    visible && startM.format('YYYY-MM-DD'),
    visible && endM.format('YYYY-MM-DD'),
  )

  const onClose = () => setVisible(false)
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px" bg="gray.100">
        <ModalHeader>充值纪录</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="70vh" maxH="70vh" overflowY="auto">
          <Stack spacing="15px">
            {rechargeList?.map((t) => (
              <Stack
                key={t.id}
                bg="white"
                shadow="md"
                borderLeftWidth="5px"
                // borderRightWidth="3px"
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
                      t.status === RechargeStatus.Success ? 'pink' : 'gray'
                    }
                  >
                    {toOptionName(rechargeStatusOpts, t.status)}
                  </Tag>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">单号：</Text>
                  <Text>{t.order_sn}</Text>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">充值金额：</Text>
                  <Text color="purple.600" fontSize="lg">
                    ¥ {t.money}
                  </Text>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text color="gray.500">支付管道：</Text>
                  <Text>{t.description}</Text>
                </HStack>
              </Stack>
            ))}
          </Stack>
          {loadingSpinner}
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

export default RechargeLogPopup
