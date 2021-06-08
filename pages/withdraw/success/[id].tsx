import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useBankCardList from '@/service/useBankCardList'
import useWithdrawDetail from '@/service/useWithdrawDetail'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiCheckCircle } from 'react-icons/hi'

function withdrawForm() {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { info, isLoading } = useWithdrawDetail(+router.query.id)
  return (
    <Layout>
      <HeaderTitleBar back title="提款信息" />
      <Box flex="1" className="layout">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Box
            // bg="contentBg.500"
            // borderRadius="md"
            // p="15px"
            color="#fff"
            mb="20px"
          >
            <VStack spacing="0px" mb="4">
              <Icon as={HiCheckCircle} fontSize="80px" color="green.500" />
              <Text fontSize="xl" color="green.500">
                提款成功
              </Text>
            </VStack>
            <Stack>
              <Box>
                <Text fontSize="sm" mb="5px" color="gray.400">
                  订单号
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.order_sn}
                </Text>
                <Divider borderColor="#ccc" py="1" />
              </Box>
              <Box>
                <Text fontSize="sm" mb="5px" color="gray.400">
                  提款金额
                </Text>
                <Text fontSize="md" fontWeight="600" color="pink.500">
                  {toCurrency(+info.money)}
                </Text>
                <Divider borderColor="#ccc" py="1" />
              </Box>
              <Box>
                <Text fontSize="sm" mb="5px" color="gray.400">
                  申请时间
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.created_at}
                </Text>
                <Divider borderColor="#ccc" py="1" />
              </Box>
              <Box>
                <Text fontSize="sm" mb="5px" color="gray.400">
                  持卡人
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.name}
                </Text>
                <Divider borderColor="#ccc" py="1" />
              </Box>
              <Box>
                <Text fontSize="sm" mb="5px" color="gray.400">
                  收款账户
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.account} ({info.bank})
                </Text>
                <Divider borderColor="#ccc" py="1" />
              </Box>
            </Stack>
          </Box>
        )}
        <HStack>
          <button
            className="btnbase outline_btn"
            onClick={() => router.push('/my')}
          >
            返回
          </button>
          <button
            className="btnbase primary_btn"
            onClick={() => router.push('/finance-rec')}
          >
            财务纪录
          </button>
        </HStack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default withdrawForm
