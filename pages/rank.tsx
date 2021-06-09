import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecPageTabs from '@/components/RecPageTabs'
import useRankChart from '@/service/useRankChart'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { Chart, Interval, Line, Point, Tooltip } from 'bizcharts'
import { Spinner } from '@chakra-ui/spinner'

function rank() {
  const { rankList, isLoading } = useRankChart()
  const chart = useMemo(
    () =>
      rankList?.map((t) => ({
        date: t.date,
        profit: +t.profit,
        bet_total: +t.bet_total,
      })),
    [rankList],
  )
  return (
    <Layout>
      <HeaderTitleBar title="大盘走势" />
      <RecPageTabs />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Box bg="containerBg.500" py="5" px="2" mb="1">
            <Chart autoFit height={250} data={chart}>
              <Line position="date*profit" />
              <Point position="date*profit" />
              <Tooltip showCrosshairs />
            </Chart>
          </Box>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rank
