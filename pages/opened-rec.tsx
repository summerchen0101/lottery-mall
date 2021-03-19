import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useService from '@/utils/useService'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

function openedRec() {
  const router = useRouter()
  const { loadingSpinner } = useLoaderProvider()
  const [currentLottery, setCurrentLottery] = useState(1)
  const { useOpenedRec, useLotteryList } = useService()
  const { data: LotteryRes } = useLotteryList()
  const { data: OpenedRes, error } = useOpenedRec(currentLottery)
  return (
    <Layout>
      <HeaderTitleBar back title="结帐纪录" />
      <Box p="20px" flex="1" overflowY="auto">
        <Select
          value={currentLottery}
          onChange={(e) => setCurrentLottery(+e.target.value)}
          mb="20px"
          bg="white"
          shadow="lg"
        >
          {LotteryRes?.list.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
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
              >
                单号
              </Th>
              <Th fontSize="md" color="white">
                条码数字
              </Th>
            </Tr>
          </Thead>
          <Tbody bg="white">
            {OpenedRes?.list.map((t) => (
              <Tr key={t.id} fontWeight="bold">
                <Td py="10px">
                  <Text color="pink.500" mb="5px">
                    {t.qishu}
                  </Text>
                  <HStack color="gray.600">
                    {t.numbers.map((t) => (
                      <Text key={t}>{t}</Text>
                    ))}
                  </HStack>
                </Td>
                <Td color="purple.600" fontSize="lg">
                  <HStack>
                    {t.value_str.map((t) => (
                      <Text key={t}>{t}</Text>
                    ))}
                  </HStack>
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

export default openedRec
