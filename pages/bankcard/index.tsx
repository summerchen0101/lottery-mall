import BankcardDetailPopup from '@/components/BankcardDetailPopup'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { BankCardStatus } from '@/lib/enums'
import { bankcardStatusOpts } from '@/lib/options'
import { BankCard } from '@/lib/types'
import useBankCardList from '@/service/useBankCardList'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
function bankcardList() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [currentCard, setCurrentCard] = useState<BankCard>(null)
  const { toOptionName } = useTransfer()
  const { bankcardList, isLoading } = useBankCardList()
  const router = useRouter()

  const handleClickCard = (data: BankCard) => {
    setCurrentCard(data)
    onOpen()
  }
  return (
    <Layout>
      <HeaderTitleBar back title="银行卡管理" />
      <Box flex="1" className="layout">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Stack spacing="15px">
            {bankcardList?.map((t) => (
              <Stack
                key={t.id}
                bg="contentBg.500"
                p="15px"
                borderRadius=".5rem"
                onClick={() => handleClickCard(t)}
              >
                <Text fontSize="18px" color="gray.400" textAlign="right">
                  {t.account}
                </Text>
                <Text color="#fff" fontSize="md" fontWeight="600">
                  {t.name}
                </Text>

                <HStack justify="space-between">
                  <Text color="#fff" fontSize="md" fontWeight="600">
                    {t.bank} / {t.bank_name}
                  </Text>
                  <Flex
                    alignItems="center"
                    color={
                      t.status === BankCardStatus.On ? 'green.500' : 'gray.400'
                    }
                  >
                    <Text as="i" fontSize="20px" lineHeight="24px" mr="1">
                      <IoIosCheckmarkCircleOutline />
                    </Text>

                    {toOptionName(bankcardStatusOpts, t.status)}
                  </Flex>
                </HStack>
              </Stack>
            ))}
            <Button
              leftIcon={<IoAddCircle />}
              variant="outline"
              bgColor="transparent"
              border="1px dashed #a8a8a8"
              borderRadius=".5rem"
              padding="2.5rem"
              w="full"
              color="#fff"
              onClick={() => router.push('/bankcard/add')}
              disabled={bankcardList?.length >= 5}
            >
              新增银行卡
            </Button>
          </Stack>
        )}
      </Box>
      <FooterNav />

      <BankcardDetailPopup
        isOpen={isOpen}
        onClose={onClose}
        bankcard={currentCard}
      />
    </Layout>
  )
}

export default bankcardList
