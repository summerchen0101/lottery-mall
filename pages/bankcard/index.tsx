import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { BankCardStatus } from '@/lib/enums'
import useService from '@/utils/useService'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import React from 'react'

function bankcardList() {
  const { useBankList } = useService()
  const { data: res, error } = useBankList()
  return (
    <Layout>
      <HeaderTitleBar back title="銀行卡管理" />
      <Box flex="1" overflowY="auto" p="20px">
        <Stack spacing="15px">
          {res?.list.map((t) => (
            <Stack
              key={t.id}
              bg="white"
              p="15px"
              borderRadius="lg"
              shadow="md"
              // borderWidth="3px"
              // borderColor="purple.100"
            >
              <HStack justify="space-between">
                <Text color="gray.900" fontSize="md" fontWeight="600">
                  {t.name}
                </Text>
                <Tag
                  variant="solid"
                  borderRadius="4px"
                  colorScheme={t.status === BankCardStatus.On ? 'pink' : 'gray'}
                >
                  {t.status === BankCardStatus.On ? '啟用中' : '未啟用'}
                </Tag>
              </HStack>
              <Text fontSize="30px" fontWeight="600" color="purple.600">
                {t.account}
              </Text>
              <Text color="gray.400" fontSize="sm" fontWeight="600">
                {t.bank} / {t.bank_name}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default bankcardList
