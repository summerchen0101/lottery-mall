import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useRechargeDetail from '@/service/useRechargeDetail'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiCheckCircle } from 'react-icons/hi'

function rechargeForm() {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { info, isLoading } = useRechargeDetail(+router.query.id)
  return (
    <Layout>
      <HeaderTitleBar back title="充值信息" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            bg="white"
            shadow="md"
            borderRadius="md"
            p="6"
            fontWeight="600"
            color="gray.500"
            mb="20px"
          >
            <VStack mb="4">
              <Icon as={HiCheckCircle} fontSize="100px" color="green.500" />
              <Text fontSize="2xl" color="gray.500">
                充值成功
              </Text>
            </VStack>
            <Stack>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  订单号
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.order_sn}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  充值金额
                </Text>
                <Text fontSize="2xl" fontWeight="600" color="pink.500">
                  {info.money}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  申请时间
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.created_at}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  持卡人
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.name}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  收款账户
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.account} ({info.bank})
                </Text>
              </Box>
            </Stack>
          </Box>
        )}
        <HStack>
          <Button
            w="full"
            colorScheme="purple"
            onClick={() => router.push('/my')}
          >
            返回
          </Button>
          <Button
            w="full"
            colorScheme="pink"
            onClick={() => router.push('/finance-rec')}
          >
            财务纪录
          </Button>
        </HStack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeForm
