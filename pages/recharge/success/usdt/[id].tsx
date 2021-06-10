import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TextCopy from '@/components/TextCopy'
import useRechargeDetail from '@/service/useRechargeDetail'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Box, Center, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
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
      <HeaderTitleBar back title="USDT转帐充值" />
      <Box flex="1" className="layout">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Box color="#fff" mb="20px">
            <Stack>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  充值金额
                </Text>
                <Text fontSize="md" fontWeight="600" color="brand.500">
                  {info.money}
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
                  汇率
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.rate}
                  <TextCopy text={info.rate}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  实际付款
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.real_money}U
                  <TextCopy text={info.real_money}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>

              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  链名称
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.name}
                  <TextCopy text={info.name}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid rgba(255,255,255,.4)" py="5px">
                <Text fontSize="sm" color="gray.400" mb="5px">
                  充值地址
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {info.account}
                  <TextCopy text={info.account}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
            </Stack>
            <HStack mt="20px" alignItems="flex-start">
              <Text fontSize="sm" color="gray.400" mb="5px">
                充值地址
              </Text>
              <Image
                src={`${process.env.apiBaseUrl}/${info.qrcode}`}
                boxSize="220px"
                objectFit="contain"
              />
            </HStack>
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
        <Text color="gray.400" fontSize="sm">
          *本次交易尚未完成,转入上面提供之收款账号方可完成支付流程{' '}
        </Text>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeForm
