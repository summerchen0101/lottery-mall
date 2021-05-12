import { useBetInfoContext } from '@/context/BetInfoProvider'
import useCurrentQishu from '@/service/useCurrentQishu'
import useGoodsInfo from '@/service/useGoodsInfo'
import useUserInfo from '@/service/useUserInfo'
import useHelper from '@/utils/useHelper'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
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
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
interface BettingPopupProps {
  countdown: number
}

function BettingPopup({ countdown }: BettingPopupProps) {
  const router = useRouter()
  const { secToTimer } = useHelper()
  const { toCurrency } = useTransfer()
  const [visible, setVisible] = useBetInfoContext().betting
  const [, setBetConfirmVisible] = useBetInfoContext().betConfirm
  const [goodsId] = useBetInfoContext().goodsId
  const [totalPrice, setTotalPrice] = useBetInfoContext().totalPrice
  const [odds, setOdds] = useBetInfoContext().odds
  const { userInfo } = useUserInfo()
  const { data: qishuData } = useCurrentQishu()
  const { goodsInfo, isLoading } = useGoodsInfo(goodsId)

  const handleSubmit = async () => {
    setVisible(false)
    setBetConfirmVisible(true)
  }

  const handleAmountChanged = (e) => {
    const value = +e.target.value
    setTotalPrice(value > 0 ? value : 0)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    goodsInfo && setOdds(+_.takeRight(goodsInfo?.chart)?.[0]?.profit)
  }, [goodsInfo])

  // 结帐倒数时间即关闭弹窗
  useEffect(() => {
    if (countdown <= 0) {
      setVisible(false)
    }
  }, [qishuData])

  useEffect(() => {
    setVisible(false)
  }, [router])
  useEffect(() => {
    visible && setTotalPrice(null)
  }, [visible])
  return (
    <Modal isOpen={visible} onClose={handleCancel} autoFocus={false}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader justify="center">
          <Tag colorScheme="red" variant="solid">
            抢购倒数：{secToTimer(countdown)}
          </Tag>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack spacing="15px">
              <HStack>
                <Image
                  src={`${process.env.apiBaseUrl}/${goodsInfo.pic_icon}`}
                  boxSize="100px"
                />
                <Box flex="1">
                  <Text
                    color="gray.700"
                    fontWeight="bold"
                    fontSize="lg"
                    mb="5px"
                  >
                    {goodsInfo.name}
                  </Text>
                  <Flex justify="space-between" align="flex-end">
                    <Text color="pink.500" fontWeight="bold" fontSize="xl">
                      收益率：{odds}%
                    </Text>
                    {/* <Tag colorScheme="red" variant="solid">
                      抢购倒数：2
                    </Tag> */}
                  </Flex>
                </Box>
              </HStack>

              <Box>
                {/* <Text color="gray.600" fontWeight="bold">
                  投资金额
                </Text> */}
                <FormControl>
                  <FormLabel>投资金额</FormLabel>
                  <HStack>
                    <Input
                      w="full"
                      bg="gray.100"
                      value={totalPrice ?? ''}
                      onChange={handleAmountChanged}
                    />
                    <Button
                      w="full"
                      colorScheme="purple"
                      onClick={() => setTotalPrice(userInfo?.money)}
                    >
                      余额全投
                    </Button>
                  </HStack>
                </FormControl>
              </Box>
              <Stack spacing="0" align="flex-end">
                <HStack>
                  <Text color="gray.500" fontWeight="bold" fontSize="md">
                    支付合计：
                  </Text>
                  <Text color="pink.500" fontWeight="bold" fontSize="2xl">
                    ¥ {toCurrency(totalPrice || 0)}
                  </Text>
                </HStack>
                <Text color="gray.400" fontWeight="bold" fontSize="sm">
                  余额：{toCurrency(userInfo?.money)}
                </Text>
              </Stack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="pink">立即充值</Button>
            <Button colorScheme="pink" onClick={handleSubmit}>
              立即抢购
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BettingPopup
