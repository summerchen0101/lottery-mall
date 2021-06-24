import { Goods } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import Image from 'next/image'
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
  const lastOdds = useMemo(() => +chart?.[chart.length - 2]?.profit, [chart])
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
    <HStack
      align="flex-end"
      bg=""
      spacing="1"
      mb="1"
      pb="1"
      borderBottom="1px"
      borderColor="#3d4448"
    >
      <Box w="full" onClick={onBetClicked}>
        <HStack
          justify="space-between"
          bg="contentBg.500"
          px="2"
          fontSize="sm"
          borderRadius="sm"
          lineHeight="25px"
        >
          <Text color="gray.400">GEM-{toNumString(item.number)}</Text>
          <Text color="gray.400">{item.name}</Text>
        </HStack>
        <Text fontSize="10px" px="2" color="#fff">
          目前收益率：
        </Text>
        <HStack justify="space-around">
          <Text fontSize="28px" color="red.500" lineHeight="20px">
            {item.odds}%
          </Text>
          <Image
            src={`${process.env.apiBaseUrl}/${item.pic_icon}`}
            loading="lazy"
            width="40px"
            height="40px"
          />
        </HStack>
        <Text fontSize="10px" px="2" color="#fff">
          比較上次：
        </Text>
        <HStack fontSize="20px" justify="center" lineHeight="20px">
          <Text>{lastOdds}%</Text>
          {diffComp}
        </HStack>
      </Box>
      <Box w="full">
        <Chart autoFit height={100} data={chart}>
          <Line
            position="date*profit"
            style={{
              lineWidth: 1,
              stroke: '#e60f0f',
            }}
          />
          {/* <Point position="year*value" /> */}
          <Tooltip showCrosshairs />
        </Chart>
      </Box>
    </HStack>
  )
}

export default React.memo(GoodsItem)
