import { useAlertProvider } from '@/context/AlertProvider'
import { Button, HStack, Text } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal'
import React, { useRef } from 'react'

type AlertPopupProps = {
  onOk: (id: number) => void
}

function AlertPopup({ onOk }: AlertPopupProps) {
  const { isOpen, onClose, id } = useAlertProvider()
  const cancelRef = useRef()
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      autoFocus={false}
      motionPreset="scale"
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx="15px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            删除银行卡
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text color="gray">是否确认删除银行卡</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <HStack>
              <Button colorScheme="brand" onClick={() => onOk(id)}>
                确认删除
              </Button>
              <Button onClick={onClose}>取消</Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default AlertPopup
