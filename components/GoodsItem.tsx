import { Goods } from '@/lib/types'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Circle, HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import React, { useMemo } from 'react'
import { Chart, Line, Point, Tooltip } from 'bizcharts'
import useHelper from '@/utils/useHelper'

function GoodsItem({
  item,
  isAccounting,
  onBetClicked,
}: {
  item: Goods
  isAccounting: boolean
  onBetClicked: () => void
}) {
  const { toNumString } = useHelper()
  return (
    <HStack bg="white" borderBottom="1px solid #ccc" spacing="1" py="1" px="1">
      <Box w="full">
        <HStack justify="space-between" bg="gray.200" px="2" fontSize="sm">
          <Text>GEM-{toNumString(item.number)}</Text>
          <Text>{item.name}</Text>
        </HStack>
        <Text fontSize="10px" px="2">
          目前收益率：
        </Text>
        <Text
          fontSize="28px"
          color="red.500"
          lineHeight="28px"
          textAlign="center"
        >
          {item.odds}%
        </Text>
        <Text fontSize="10px" px="2">
          比較上次：
        </Text>
        <HStack fontSize="20px" justify="center" lineHeight="20px">
          <Text>0.7%</Text>
          <Text color="red.500">▲0.2%</Text>
        </HStack>
      </Box>
      <Box w="full">
        <Chart autoFit height={100} data={item.chart}>
          <Line position="date*profit" />
          {/* <Point position="year*value" /> */}
          <Tooltip showCrosshairs />
        </Chart>
      </Box>
    </HStack>
  )
}

export default GoodsItem
