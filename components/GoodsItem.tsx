import { Goods } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Chart, Line, Tooltip } from 'bizcharts'
import numeral from 'numeral'
import React, { useMemo } from 'react'

function GoodsItem({
  item,
  onBetClicked,
}: {
  item: Goods
  onBetClicked: () => void
}) {
  const { toNumString } = useHelper()
  const chart = useMemo(
    () => item.chart.map((t) => ({ ...t, profit: +t.profit })),
    [item.chart],
  )
  const lastOdds = useMemo(() => +chart?.[chart.length - 2].profit, [chart])
  const diff = useMemo(() => numeral(item.odds).subtract(lastOdds).value(), [
    lastOdds,
  ])
  const diffComp = useMemo(() => {
    const param = {
      color: 'gray.500',
      icon: '▲',
    }
    if (diff > 0) {
      param.color = 'red.500'
      param.icon = '▲'
    }
    if (diff < 0) {
      param.color = 'green.500'
      param.icon = '▼'
    }
    return (
      <Text color={param.color}>
        {param.icon}
        {diff}%
      </Text>
    )
  }, [diff])
  return (
    <HStack bg="white" borderBottom="1px solid #ccc" spacing="1" py="1" px="1">
      <Box w="full" onClick={onBetClicked}>
        <HStack
          justify="space-between"
          bg="gray.200"
          px="2"
          fontSize="sm"
          lineHeight="25px"
        >
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
          <Text>{lastOdds}%</Text>
          {diffComp}
        </HStack>
      </Box>
      <Box w="full">
        <Chart autoFit height={100} data={chart}>
          <Line position="date*profit" />
          {/* <Point position="year*value" /> */}
          <Tooltip showCrosshairs />
        </Chart>
      </Box>
    </HStack>
  )
}

export default React.memo(GoodsItem)
