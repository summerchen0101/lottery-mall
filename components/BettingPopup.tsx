import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import useTransfer from '@/utils/useTransfer'
import { bankcardStatusOpts } from '@/lib/options'
import { BankCardStatus } from '@/lib/enums'
import { BankCard } from '@/lib/types'
import { Button } from '@chakra-ui/button'
import useService from '@/utils/useService'
import { Image } from '@chakra-ui/image'
import { Tag } from '@chakra-ui/tag'
import { Input } from '@chakra-ui/input'
import { useRouter } from 'next/dist/client/router'
import _ from 'lodash'
import { usePopupContext } from '@/context/PopupContext'
interface BettingPopupProps {
  goodsId: number
  countdown: string
}

const buyCountOpts = [1, 5, 10, 20, 30, 50, 80, 100]

function BettingPopup({ goodsId, countdown }: BettingPopupProps) {
  const { toOptionName } = useTransfer()
  const router = useRouter()
  const [visible, setVisible] = usePopupContext('betting')
  const [, setBetConfirmVisible] = usePopupContext('betConfirm')
  const { useGoodsInfo, useWanfaList, useUserProfile } = useService()
  const { data: WanfaRes } = useWanfaList(+(router.query.id as string))

  const { data: res, error } = useGoodsInfo(goodsId)
  // const [] = useState()
  const info = res?.data
  const categoryA = useMemo(
    () => WanfaRes?.data.filter((t) => t.category === 1),
    [WanfaRes],
  )
  const categoryB = useMemo(
    () => WanfaRes?.data.filter((t) => t.category === 2),
    [WanfaRes],
  )
  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)} autoFocus={false}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader justify="center">
          <Tag colorScheme="red" variant="solid">
            抢购倒数：{countdown}
          </Tag>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {info && (
            <Stack spacing="15px">
              <HStack>
                <Image
                  src={`${process.env.apiBaseUrl}/${info.pic_icon}`}
                  boxSize="100px"
                />
                <Box flex="1">
                  <Text
                    color="gray.700"
                    fontWeight="bold"
                    fontSize="lg"
                    mb="5px"
                  >
                    {info.name}
                  </Text>
                  <Flex justify="space-between" align="flex-end">
                    <Text color="pink.500" fontWeight="bold" fontSize="xl">
                      ¥ {info.price}
                    </Text>
                    {/* <Tag colorScheme="red" variant="solid">
                      抢购倒数：2
                    </Tag> */}
                  </Flex>
                </Box>
              </HStack>

              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    ABCD选边
                  </Text>
                  <Tag colorScheme="yellow">
                    收益比例 1:{categoryA?.[0].odds}
                  </Tag>
                </HStack>
                <SimpleGrid columns={4} spacing="5px">
                  {categoryA.map((t) => (
                    <Button size="sm" key={t.id} colorScheme="purple">
                      {t.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    尾号数字抢购
                  </Text>
                  <Tag colorScheme="yellow">
                    收益比例 1:{categoryB?.[0].odds}
                  </Tag>
                </HStack>
                <SimpleGrid columns={5} spacing="5px">
                  {categoryB.map((t) => (
                    <Button size="sm" key={t.id} colorScheme="purple">
                      {t.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
              <Box>
                <HStack mb="5px">
                  <Text color="gray.600" fontWeight="bold">
                    抢购数量
                  </Text>
                </HStack>
                <SimpleGrid columns={5} spacing="5px">
                  {buyCountOpts.map((t) => (
                    <Button size="sm" key={t} colorScheme="purple">
                      {t}
                    </Button>
                  ))}
                  {/* <Input size="sm" placeholder="输入" /> */}
                </SimpleGrid>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.500" fontWeight="bold" fontSize="md">
                    支付合计：
                  </Text>
                  <Text color="pink.500" fontWeight="bold" fontSize="2xl">
                    ¥ 100
                  </Text>
                </HStack>
                <Text color="gray.400" fontWeight="bold" fontSize="sm">
                  余额：100
                </Text>
              </Stack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="pink">立即充值</Button>
            <Button
              colorScheme="pink"
              onClick={() => setBetConfirmVisible(true)}
            >
              立即抢购
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingPopup
