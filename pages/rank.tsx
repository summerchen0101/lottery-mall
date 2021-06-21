import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecPageTabs from '@/components/RecPageTabs'
import useRankChart from '@/service/useRankChart'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo, useState, useEffect } from 'react'
import { Chart, Interval, Line, Point, Tooltip } from 'bizcharts'
import { Spinner } from '@chakra-ui/spinner'
import useLotteryList from '@/service/useLotteryList'
import { Select } from '@chakra-ui/react'

function rank() {
  const { lotteryList } = useLotteryList()
  const [lotteryId, setLotteryId] = useState(lotteryList?.[0].id)
  const { rankList, isLoading } = useRankChart(lotteryId)
  const chart = useMemo(
    () =>
      rankList?.map((t) => ({
        date: t.date,
        profit: +t.profit,
        bet_total: +t.bet_total,
      })),
    [rankList],
  )
  useEffect(() => {
    setLotteryId(lotteryList?.[0].id)
  }, [lotteryList])
  return (
    <Layout>
      <HeaderTitleBar title="大盘走势" />
      <RecPageTabs />
      <Box p="15px" flex="1" overflowY="auto">
        <Select
          value={lotteryId}
          onChange={(e) => setLotteryId(+e.target.value)}
          mb="3"
        >
          {lotteryList?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Box bg="containerBg.500" p="2" mb="3">
              <Chart autoFit height={200} data={chart}>
                <Line
                  position="date*profit"
                  style={{
                    lineWidth: 1,
                    stroke: '#e60f0f',
                  }}
                />
                <Point
                  position="date*profit"
                  style={{
                    r: 3,
                    stroke: 'white',
                  }}
                />
                <Tooltip showCrosshairs />
              </Chart>
            </Box>
            <Box bg="containerBg.500" p="2">
              <Chart height={100} autoFit data={chart}>
                <Interval position="date*bet_total" color="#e60f0f" />
                <Tooltip shared />
              </Chart>
            </Box>
          </>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rank
