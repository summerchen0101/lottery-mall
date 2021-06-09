import FloatNav from '@/components/FloatNav'
import FooterNav from '@/components/FooterNav'
import Layout from '@/components/Layout'
import { MemberType } from '@/lib/enums'
import useUserInfo from '@/service/useUserInfo'
import useAlert from '@/utils/useAlert'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Button, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import {
  IoIosMail,
  IoIosSettings,
  IoIosHelpCircleOutline,
} from 'react-icons/io'

const linkItemProps = {
  py: '2',
  borderBottom: '1px',
  borderColor: 'rgba(255,255,255,.2)',
}
function my() {
  const { doLogout } = useService()
  const router = useRouter()
  const alert = useAlert()
  const { userInfo } = useUserInfo()
  const { toCurrency } = useTransfer()
  const handleLogout = async () => {
    const res = await doLogout()
    await router.push('/login')
    alert.success(res.message)
  }
  return (
    <Layout>
      {/* <HeaderTitleBar
        title="我的"
        extra={
          <Icon as={HiOutlineLogout} fontSize="20px" onClick={handleLogout} />
        }
      /> */}

      <Flex bg="containerBg.500" p="15px">
        <VStack w="100%" alignItems="flex-start" color="gray.400" spacing="8px">
          <Flex w="100%">
            <Text>
              您好,<Text as="span">{userInfo?.username}</Text>
            </Text>
            <Spacer />
            <HStack>
              <IoIosMail
                color="#fff"
                fontSize="26px"
                onClick={() => router.push('/news')}
              />
              <IoIosSettings
                color="#fff"
                fontSize="24px"
                onClick={() => router.push('/profile')}
              />
            </HStack>
          </Flex>

          <HStack w="100%" alignItems="flex-end">
            <Text>会员编号: {userInfo?.uid}</Text>
            <Spacer />
            <Text color="brand.500" fontWeight="600" fontSize="1.2rem">
              <Box as="span" fontSize="12px" mr="1" color="gray.400">
                G币
              </Box>
              {toCurrency(userInfo?.money)}
            </Text>
          </HStack>
        </VStack>
      </Flex>
      <Box flex="1" className="layout">
        <HStack justify="space-evenly" bg="#b9af9c" p="15px" borderRadius="lg">
          <Flex
            onClick={() => router.push('/recharge')}
            color="white"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Image w="2.2rem" h="auto" src="/img/ic-deposit.svg"></Image>
            <Text fontSize="md" color="#006d00" fontWeight="600">
              充值
            </Text>
          </Flex>
          <Flex
            onClick={() => router.push('/withdraw')}
            color="white"
            flexDirection="column"
          >
            <Image w="2.2rem" h="auto" src="/img/ic-withdraw.svg"></Image>
            <Text fontSize="md" color="#d60000" fontWeight="600">
              提现
            </Text>
          </Flex>
        </HStack>

        <SimpleGrid
          columns={2}
          mt="20px"
          fontSize="lg"
          color="#fff"
          fontWeight="bold"
          p="20px 0"
          spacingX="15px"
          spacingY="15px"
        >
          <HStack {...linkItemProps} onClick={() => router.push('/bankcard')}>
            <Image w="1.8rem" src="/img/ic-bankcard.png"></Image>
            <Text>银行卡管理</Text>
          </HStack>
          <HStack
            {...linkItemProps}
            onClick={() => router.push('/finance-rec')}
          >
            <Image w="1.8rem" src="/img/ic-cashrecord.png"></Image>
            <Text>财务管理</Text>
          </HStack>
          <HStack {...linkItemProps} onClick={() => router.push('/bet-rec')}>
            <Image w="1.8rem" src="/img/ic-betrecord.png"></Image>
            <Text>下单纪录</Text>
          </HStack>
          <HStack {...linkItemProps} onClick={() => router.push('/agent')}>
            <Image w="1.8rem" src="/img/ic-agent.png"></Image>
            <Text>代理中心</Text>
          </HStack>
          <HStack {...linkItemProps} onClick={() => router.push('/about')}>
            <Image w="1.8rem" src="/img/ic-about.png"></Image>
            <Text>GEM介绍</Text>
          </HStack>
          <HStack {...linkItemProps} onClick={() => router.push('/hiring')}>
            <Image w="1.8rem" src="/img/ic-recruit.png"></Image>
            <Text>人才招聘</Text>
          </HStack>
          {/* <Box {...linkItemProps} onClick={() => router.push('/bankcard')}>
            银行卡管理
          </Box>
          <Box {...linkItemProps} onClick={() => router.push('/finance-rec')}>
            财务管理
          </Box>
          <Box {...linkItemProps} onClick={() => router.push('/bet-rec')}>
            下单纪录
          </Box>
          <Box {...linkItemProps} onClick={() => router.push('/faq')}>
            常见问题
          </Box>
          <Box {...linkItemProps} onClick={() => router.push('/about')}>
            GEM介绍
          </Box>
          <Box {...linkItemProps} onClick={() => router.push('/hiring')}>
            人才招聘
          </Box>
          {userInfo?.class === MemberType.Agent && (
            <Box {...linkItemProps} onClick={() => router.push('/agent')}>
              代理中心
            </Box>
          )} */}
        </SimpleGrid>
        <Flex
          justifyContent="center"
          align="center"
          color="gray.400"
          py="2"
          mt="5rem"
          onClick={() => router.push('/faq')}
        >
          <IoIosHelpCircleOutline fontSize="20px" />
          <Text fontSize="md" ml="1">
            常见问题
          </Text>
        </Flex>
        <Button
          colorScheme="darkblue"
          w="100%"
          borderRadius="3px"
          onClick={handleLogout}
        >
          登出
        </Button>
      </Box>
      <FooterNav />
      <FloatNav userInfo={userInfo} />
    </Layout>
  )
}

export default my
