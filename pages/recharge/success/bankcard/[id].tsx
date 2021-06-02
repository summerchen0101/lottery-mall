import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TextCopy from '@/components/TextCopy'
import useRechargeDetail from '@/service/useRechargeDetail'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { BiCopyAlt } from 'react-icons/bi'

function rechargeForm() {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { info, isLoading } = useRechargeDetail(+router.query.id)
  return (
    <Layout>
      <HeaderTitleBar back title="銀行卡充值" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Box
          bg="red.500"
          py="2"
          px="3"
          color="white"
          borderRadius="md"
          mb="3"
          shadow="md"
          fontWeight="600"
        >
          PS: 此收款账号仅本次有效,下次充值请重新获取
        </Box>
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
            {/* <VStack mb="4">
              <Icon as={HiCheckCircle} fontSize="100px" color="green.500" />
              <Text fontSize="2xl" color="gray.500">
                充值成功
              </Text>
            </VStack> */}
            <Stack>
              {/* <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  充值单号
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.order_sn}
                  <TextCopy text={info.order_sn}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box> */}
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  存款人姓名
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.self_name}
                  {/* <TextCopy text={info.self_name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy> */}
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  充值金额
                </Text>
                <Text fontSize="2xl" fontWeight="600" color="pink.500">
                  {toCurrency(+info.money, 0)}
                  <TextCopy text={info.money}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>

              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  收款姓名
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.name}
                  <TextCopy text={info.name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  收款卡号
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.account}
                  <TextCopy text={info.account}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  收款银行
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.bank}
                  <TextCopy text={info.bank}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  分行名称
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.bank_name}
                  <TextCopy text={info.bank_name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
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
