import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TextCopy from '@/components/TextCopy'
import useRechargeDetail from '@/service/useRechargeDetail'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Box, Center, HStack, Stack, Text } from '@chakra-ui/layout'
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
            <Stack>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  充值金额
                </Text>
                <Text fontSize="2xl" fontWeight="600" color="pink.500">
                  {info.money}
                  <TextCopy text={info.money}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  汇率
                </Text>
                <Text fontSize="2xl" fontWeight="600">
                  {info.rate}
                  <TextCopy text={info.rate}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  实际付款
                </Text>
                <Text fontSize="2xl" fontWeight="600">
                  {info.real_money}U
                  <TextCopy text={info.real_money}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>

              <Box borderBottom="1px solid #ccc" py="5px">
                <Text fontSize="sm" mb="5px">
                  链名称
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
                  充值地址
                </Text>
                <Text fontSize="lg" fontWeight="600">
                  {info.account}
                  <TextCopy text={info.account}>
                    <Icon as={BiCopyAlt} float="right" fontSize="22px" />
                  </TextCopy>
                </Text>
              </Box>
            </Stack>
            <Center mt="30px">
              <Image
                src={`${process.env.apiBaseUrl}/${info.qrcode}`}
                boxSize="220px"
                objectFit="contain"
              />
            </Center>
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
