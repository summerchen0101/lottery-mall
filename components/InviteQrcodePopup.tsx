import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useBetSuccess from '@/service/useBetSuccess'
import { Image } from '@chakra-ui/image'
import { Center, Divider, HStack, Text } from '@chakra-ui/layout'
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
import React, { useEffect, useState } from 'react'

interface InviteQrcodePopupProps {
  isOpen: boolean
  onClose: () => void
  qrcodeImg: string
}
function InviteQrcodePopup({
  isOpen,
  onClose,
  qrcodeImg,
}: InviteQrcodePopupProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} size="full">
      <ModalOverlay />
      <ModalContent m="0" bg="gray.800">
        {/* <ModalHeader>邀请链结</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody color="#fff" lineHeight="24px">
          <Center h="full">
            <Image src={qrcodeImg} boxSize="250px" />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InviteQrcodePopup
