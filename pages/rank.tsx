import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecPageTabs from '@/components/RecPageTabs'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType } from '@/lib/enums'
import { rankDateRangeOpts } from '@/lib/options'
import useRankList from '@/service/useRankList'
import useDateRange from '@/utils/useDateRange'
import { Box } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function rank() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const [dateRangeType, setDateRangeType] = useState(DateRangeType.Today)
  const [startM, endM] = useDateRange(dateRangeType)
  const { rankList } = useRankList(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )
  return (
    <Layout>
      <HeaderTitleBar title="大盘走势" />
      <RecPageTabs />
      <Box p="20px" flex="1" overflowY="auto">
        <Select
          value={dateRangeType}
          onChange={(e) => setDateRangeType(+e.target.value)}
          mb="20px"
          shadow="lg"
          bg="white"
        >
          {rankDateRangeOpts?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
        <Table size="sm" variant="striped" shadow="md">
          <Thead bg="purple.600">
            <Tr>
              <Th
                fontSize="md"
                color="white"
                py="10px"
                borderRight="1px solid #eee"
                w="20%"
              >
                排行
              </Th>
              <Th fontSize="md" color="white">
                帐号
              </Th>
              <Th fontSize="md" color="white">
                抢购量
              </Th>
            </Tr>
          </Thead>
          <Tbody bg="white">
            {rankList?.map((t) => (
              <Tr key={t.uid} fontWeight="bold">
                <Td py="20px" fontSize="lg">
                  {t.rank}
                </Td>
                <Td fontSize="lg">{t.username}</Td>
                <Td color="pink.600" fontSize="lg">
                  {t.count}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <FooterNav />
      {loadingSpinner}
    </Layout>
  )
}

export default rank
