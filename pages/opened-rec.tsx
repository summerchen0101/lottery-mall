import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useOpenedRec from '@/service/useOpenedRec'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import React from 'react'

function openedRec() {
  const { openedList, isLoading } = useOpenedRec()
  return (
    <Layout>
      <HeaderTitleBar back title="结帐纪录" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
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
              {openedList?.map((t) => (
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
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default openedRec
