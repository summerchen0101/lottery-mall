import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { BankCardStatus } from '@/lib/enums'
import { bankcardStatusOpts } from '@/lib/options'
import { BankCard } from '@/lib/types'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
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
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function bankcardList() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [currentCard, setCurrentCard] = useState<BankCard>(null)
  const { useBankCardList } = useService()
  const { toOptionName } = useTransfer()
  const { data: res, error } = useBankCardList()
  const router = useRouter()

  const handleClickCard = (data: BankCard) => {
    setCurrentCard(data)
    onOpen()
  }
  return (
    <Layout>
      <HeaderTitleBar back title="银行卡管理" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack spacing="15px">
          <Button
            colorScheme="pink"
            w="full"
            onClick={() => router.push('/bankcard/add')}
          >
            新增银行卡
          </Button>
          {res?.list.map((t) => (
            <Stack
              key={t.id}
              bg="white"
              p="15px"
              borderRadius="lg"
              shadow="md"
              // borderWidth="3px"
              // borderColor="purple.100"
              onClick={() => handleClickCard(t)}
            >
              <HStack justify="space-between">
                <Text color="gray.900" fontSize="md" fontWeight="600">
                  {t.name}
                </Text>
                <Tag
                  variant="solid"
                  borderRadius="4px"
                  colorScheme={t.status === BankCardStatus.On ? 'pink' : 'gray'}
                >
                  {toOptionName(bankcardStatusOpts, t.status)}
                </Tag>
              </HStack>
              <Text fontSize="30px" fontWeight="600" color="purple.600">
                {t.account}
              </Text>
              <Text color="gray.400" fontSize="sm" fontWeight="600">
                {t.bank} / {t.bank_name}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Box>
      <FooterNav />

      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <ModalOverlay />
        <ModalContent mx="20px">
          <ModalHeader>我的银行信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentCard && (
              <>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    状态
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    color={
                      currentCard.status === BankCardStatus.On
                        ? 'pink.500'
                        : 'gray.500'
                    }
                  >
                    {toOptionName(bankcardStatusOpts, currentCard.status)}
                  </Text>
                </Box>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    银行卡姓名
                  </Text>
                  <Text fontSize="lg" fontWeight="600">
                    {currentCard.name}
                  </Text>
                </Box>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    银行名称
                  </Text>
                  <Text fontSize="lg" fontWeight="600">
                    {currentCard.bank}
                  </Text>
                </Box>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    支行名称
                  </Text>
                  <Text fontSize="lg" fontWeight="600">
                    {currentCard.bank_name}
                  </Text>
                </Box>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    银行帐号
                  </Text>
                  <Text fontSize="lg" fontWeight="600">
                    {currentCard.account}
                  </Text>
                </Box>
                <Box borderBottom="1px solid #ccc" py="10px">
                  <Text fontSize="sm" mb="5px">
                    开户省份 / 城市
                  </Text>
                  <Text fontSize="lg" fontWeight="600">
                    {currentCard.province} / {currentCard.city}
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
    </Layout>
  )
}

export default bankcardList
