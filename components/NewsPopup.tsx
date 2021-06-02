import { useBetInfoContext } from '@/context/BetInfoProvider'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import useBetSuccess from '@/service/useBetSuccess'
import useNewsList from '@/service/useNewsList'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { HStack, Stack, StackDivider, Text } from '@chakra-ui/layout'
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

function NewsPopup() {
  const router = useRouter()
  const [visible, setVisible] = usePopupContext('news')
  const { newsList, isLoading } = useNewsList()

  const onClose = () => {
    setVisible(false)
    router.push({ pathname: router.pathname })
  }

  useEffect(() => {
    setVisible(false)
  }, [router])
  return (
    <Modal isOpen={visible} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader>最新公告</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack divider={<StackDivider />}>
              {newsList?.map((t, i) => (
                <Text
                  key={i}
                  onClick={() => router.push(`/news/${t.id}`)}
                  cursor="pointer"
                  color="gray.600"
                >
                  {t.name}
                </Text>
              ))}
            </Stack>
          )}
        </ModalBody>

        <ModalFooter mt="10px">
          <Button colorScheme="purple" w="full" onClick={onClose}>
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewsPopup
