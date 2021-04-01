import { CurrentQishuResponse } from '@/lib/types'
import { Image } from '@chakra-ui/image'
import { Box, Circle, Flex, Heading, HStack, Text } from '@chakra-ui/layout'
import React, { useMemo } from 'react'
import _ from 'lodash'
import useTransfer from '@/utils/useTransfer'

interface HomeQishuBoxProps {
  acoutingCountDown: string
  data: CurrentQishuResponse['data']
}
function HomeQishuBox({ acoutingCountDown, data }: HomeQishuBoxProps) {
  const { toCountDownTimer } = useTransfer()
  const toQishuNo = (qishu: number) => _.takeRight(qishu.toString(), 2)

  const restartCountDown = useMemo(() => {
    if (data.close_time - data.countdown > 0) {
      return toCountDownTimer(data.countdown)
    }
    return ''
  }, [data])
  return (
    <Box
      bg="purple.100"
      mt="15px"
      borderRadius="md"
      p="15px"
      mb="10px"
      shadow="md"
      border="2px solid #eee"
    >
      <Flex justify="space-between" mb="10px" color="gray.600" fontWeight="600">
        {acoutingCountDown ? (
          <>
            <Text>距第 No.{toQishuNo(data.next_qishu)} 订单结帐</Text>
            <Text color="red.600" fontWeight="bold">
              {acoutingCountDown}
            </Text>
          </>
        ) : (
          <>
            <Text color="red.500">
              订单 No.{toQishuNo(data.next_qishu)} 结帐中
            </Text>
            <HStack color="red.500">
              <Text fontWeight="bold">{restartCountDown}</Text>
              <Text>后可下注</Text>
            </HStack>
          </>
        )}
      </Flex>

      <Heading mb="15px" color="purple.600" textAlign="center">
        {data.lottery_name}
        <Text fontSize="md">No.{toQishuNo(data.qishu)} 订单</Text>
      </Heading>

      <Flex bg="white" align="start" pos="relative">
        <Circle
          size="30px"
          bg="pink.500"
          color="white"
          fontWeight="bold"
          pos="absolute"
          top="0"
          right="0"
          m="2"
        >
          {data.goods.number}
        </Circle>
        <Image
          src={`${process.env.apiBaseUrl}/${data.goods.pic_icon}`}
          boxSize="100px"
          objectFit="cover"
        />
        <Box flex="1" p="10px">
          <Text fontSize="md" color="pink.500" fontWeight="600">
            {data.goods.type_name}
          </Text>
          <Text fontSize="xl" fontWeight="bold" mt="2" color="gray.600">
            {data.goods.name}
          </Text>
        </Box>
      </Flex>

      {/* <HStack mt="3">
              {data.numbers.map((t, i) => (
                <Circle
                  key={i}
                  size="35px"
                  bg="purple.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="20px"
                  shadow="lg"
                  border="2px solid #eee"
                >
                  {t}
                </Circle>
              ))}
            </HStack> */}
    </Box>
  )
}

export default HomeQishuBox
