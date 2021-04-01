import { Goods } from '@/lib/types'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Circle, Stack, Text } from '@chakra-ui/layout'
import React from 'react'

function GoodsItem({
  item,
  isAccounting,
  onBetClicked,
}: {
  item: Goods
  isAccounting: boolean
  onBetClicked: () => void
}) {
  return (
    <Stack
      p="20px"
      borderRadius="md"
      bg="white"
      shadow="md"
      spacing="1"
      pos="relative"
    >
      <Circle
        size="30px"
        bg="pink.500"
        color="white"
        fontWeight="bold"
        pos="absolute"
        top="0"
        left="0"
        m="2"
      >
        {item.number}
      </Circle>
      <Image
        boxSize="120px"
        mx="auto"
        src={`${process.env.apiBaseUrl}/${item.pic_icon}`}
      />
      <Text textAlign="center">
        <Text color="gray.500" fontWeight="bold" noOfLines={1}>
          {item.name}
        </Text>
        <Text color="pink.500" fontSize="sm" fontWeight="bold">
          价差收益率 {item.odds}%
        </Text>
      </Text>
      {/* <Text color="pink.500" fontWeight="bold">
                ¥ {toCurrency(item.price, 0)}
              </Text> */}
      {isAccounting ? (
        <Button disabled size="sm" w="full" colorScheme="purple">
          结帐中
        </Button>
      ) : (
        <Button size="sm" w="full" colorScheme="purple" onClick={onBetClicked}>
          立即下单
        </Button>
      )}
    </Stack>
  )
}

export default GoodsItem
