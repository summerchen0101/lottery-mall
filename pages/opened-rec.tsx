import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import RecPageTabs from '@/components/RecPageTabs'
import useLotteryList from '@/service/useLotteryList'
import useOpenedRec from '@/service/useOpenedRec'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import React, { useState, useEffect } from 'react'

import Barcode from 'react-barcode'

function openedRec() {
  const { lotteryList } = useLotteryList()
  const [lotteryId, setLotteryId] = useState(lotteryList?.[0].id)
  const { openedList, isLoading } = useOpenedRec(lotteryId)

  useEffect(() => {
    setLotteryId(lotteryList?.[0].id)
  }, [lotteryList])
  return (
    <Layout>
      <HeaderTitleBar title="结帐纪录" />
      <RecPageTabs />
      <Box className="layout" flex="1" overflowY="auto">
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
          <Table size="sm" variant="striped" shadow="md">
            <Thead bg="brand.500">
              <Tr>
                <Th
                  fontSize="md"
                  color="white"
                  py="10px"
                  textAlign="center"
                  borderRight="1px solid #eee"
                >
                  单号
                </Th>
                <Th fontSize="md" color="white" textAlign="center">
                  条码数字
                </Th>
              </Tr>
            </Thead>
            <Tbody bg="#dcdcdc">
              {openedList?.map((t) => (
                <Tr key={t.id} fontWeight="bold">
                  <Td py="10px">
                    <VStack spacing="0">
                      <Text color="#333">{t.qishu}</Text>
                      <Barcode
                        value={t.numbers.join(' ')}
                        height={50}
                        width={1}
                        background="transparent"
                        displayValue={false}
                      />
                      <HStack color="#333">
                        {t.numbers.map((t, i) => (
                          <Text key={i}>{t}</Text>
                        ))}
                      </HStack>
                    </VStack>
                  </Td>
                  <Td color="#333" fontSize="lg">
                    <HStack justifyContent="center">
                      {t.value_str.map((t, i) => (
                        <Text key={i}>{t}</Text>
                      ))}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default openedRec
