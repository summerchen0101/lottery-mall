import DateTabGroup from '@/components/DateTabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { beforeDateRangeOpts, gameStatusOpts } from '@/lib/options'
import { Score } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'

const scores: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const [scores, setScores] = useState<Score[]>([])
  const API = useRequest()
  const { toOptionName, toDateTime } = useTransfer()
  const fetchScores = async () => {
    try {
      const res = await API.getScoreList()
      setScores(res.data.list)
    } catch (err) {}
  }
  useEffect(() => {
    fetchScores()
    const interval = setInterval(fetchScores, 1000 * 30)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="即時比分" />
      <Box className="main-content">
        <Table size="sm" w="full">
          <Thead bgColor="gray.100" whiteSpace="nowrap">
            <Tr>
              <Th padding=".25rem .9rem">開賽</Th>
              <Th padding=".25rem .9rem">聯盟</Th>
              <Th padding=".25rem .9rem">对阵</Th>
              <Th padding=".25rem .9rem">全場</Th>
              <Th padding=".25rem .9rem">半場</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((t, i) => (
              <Tr key={i}>
                <Td fontSize="xs" padding=".25rem .9rem">
                  {t.play_time}
                  <br />
                  {toOptionName(gameStatusOpts, t.game_status)}
                </Td>
                <Td fontSize="xs" padding=".25rem .9rem">
                  <Text isTruncated w="60px">
                    {t.league}
                  </Text>
                </Td>
                <Td fontSize="xs" padding=".25rem .9rem">
                  <Text isTruncated w="80px">
                    {t.home_team} (主)
                  </Text>
                  <Text isTruncated w="80px">
                    {t.away_team}
                  </Text>
                </Td>
                <Td padding=".25rem .9rem">
                  <div>{t.home_score}</div>
                  <div>{t.away_score}</div>
                </Td>
                <Td padding=".25rem .9rem">
                  <div>{t.home_half_score}</div>
                  <div>{t.away_half_score}</div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* <Box>
          <Box className="team-wrap" bgColor="gray.100">
            <div className="datetime">时间</div>
            <div className="teaminfo">对阵</div>
            <div className="result-score">全场</div>
            <div className="result-score">上半</div>
            <div className="resul-total-score">总分</div>
            <div className="resul-total-score">狀態</div>
          </Box>
          <div className="result-wrap clearfix">
            {scores.map((t, i) => (
              <div key={i} className="team-wrap">
                <div className="datetime">07-08 12:54</div>
                <div className="teaminfo">
                  <div>比兰尼塞斯</div>
                  <div>法伦斯</div>
                </div>
                <div className="result-score">
                  <div>0</div>
                  <div>1</div>
                </div>
                <div className="result-score">
                  <div>0</div>
                  <div>1</div>
                </div>
                <div className="resul-total-score">1</div>
                <div>{toOptionName(gameStatusOpts, t.game_status)}</div>
              </div>
            ))}
          </div>
        </Box> */}
      </Box>

      <FooterNavBar />
    </Layout>
  )
}

export default scores
