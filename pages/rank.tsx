import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { DateRangeType } from '@/lib/enums'
import { dateRangeOpts } from '@/lib/options'
import useDateRange from '@/utils/useDateRange'
import useService from '@/utils/useService'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function rank() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const [dateRangeType, setDateRangeType] = useState(DateRangeType.Today)
  const { useLeaderBoard } = useService()
  const [startM, endM] = useDateRange(dateRangeType)
  const { data: res, error } = useLeaderBoard(
    startM.format('YYYY-MM-DD'),
    endM.format('YYYY-MM-DD'),
  )
  return (
    <Layout>
      <Box p="20px" bg="gray.100" h="100vh" w="100vw" overflowY="auto">
        <Select
          value={dateRangeType}
          onChange={(e) => setDateRangeType(+e.target.value)}
          mb="20px"
          shadow="lg"
          bg="white"
        >
          {dateRangeOpts?.map((t) => (
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
            {res?.data.list.map((t) => (
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
      {loadingSpinner}
    </Layout>
  )
}

export default rank
