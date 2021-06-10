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
      <Box flex="1" overflowY="auto" className="layout">
        {isLoading ? (
          <Spinner />
        ) : (
          <Box mb="20px">
            {/* <VStack mb="4">
              <Icon as={HiCheckCircle} fontSize="100px" color="green.500" />
              <Text fontSize="2xl" color="gray.500">
                充值成功
              </Text>
            </VStack> */}
            <Stack>
              {/* <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  充值单号
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
                  {info.order_sn}
                  <TextCopy text={info.order_sn}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box> */}
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  存款人姓名
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
                  {info.self_name}
                  {/* <TextCopy text={info.self_name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy> */}
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="#fff" mb="5px">
                  充值金额
                </Text>
                <Text fontSize="md" fontWeight="600" color="brand.500">
                  {toCurrency(+info.money, 0)}
                  <TextCopy text={info.money}>
                    <Icon
                      as={BiCopyAlt}
                      float="right"
                      fontSize="22px"
                      color="#fff"
                    />
                  </TextCopy>
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  收款姓名
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
                  {info.name}
                  <TextCopy text={info.name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  收款卡号
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
                  {info.account}
                  <TextCopy text={info.account}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  收款银行
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
                  {info.bank}
                  <TextCopy text={info.bank}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  分行名称
                </Text>
                <Text fontSize="md" color="#fff" fontWeight="600">
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
            colorScheme="red"
            borderRadius="3px"
            onClick={() => router.push('/my')}
          >
            返回
          </Button>
          <Button
            w="full"
            colorScheme="red"
            borderRadius="3px"
            onClick={() => router.push('/finance-rec')}
          >
            财务纪录
          </Button>
        </HStack>
        <Box color="white" fontSize="sm" color="gray.400" mt="1">
          *本次交易尚未完成,转入上面提供之收款账号方可完成支付流程
        </Box>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeForm
