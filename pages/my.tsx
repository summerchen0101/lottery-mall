import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { MemberType } from '@/lib/enums'
import useUserInfo from '@/service/useUserInfo'
import useAlert from '@/utils/useAlert'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Box, Circle, HStack, SimpleGrid, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { BiArchiveOut, BiDollarCircle, BiNews, BiUser } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'

const linkItemProps = {
  bg: 'gray.200',
  shadow: 'md',
  px: '15px',
  py: '15px',
  color: 'gray.600',
  fontWeight: 'bold',
  fontSize: 'lg',
  // borderLeftWidth: '5px',
  // borderColor: 'gray.500',
  borderRadius: 'sm',
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
      <HeaderTitleBar
        title="我的"
        extra={
          <Icon as={HiOutlineLogout} fontSize="20px" onClick={handleLogout} />
        }
      />
      <Box flex="1" overflowY="auto" bg="gray.400">
        <Box bg="white" p="20px">
          <Text fontSize="sm" color="gray.500" fontWeight="bold">
            帐户余额：
          </Text>
          <HStack
            spacing="20px"
            mb="15px"
            color="pink.500"
            fontWeight="bold"
            fontSize="3xl"
          >
            <Text>$ {toCurrency(userInfo?.money)}</Text>
          </HStack>

          <HStack justify="space-evenly" mb="-50px">
            <Circle
              onClick={() => router.push('/withdraw')}
              size="70px"
              shadow="lg"
              bg="gray.700"
              color="white"
              flexDirection="column"
            >
              <Icon fontSize="30px" as={BiArchiveOut} />
              <Text fontSize="10px" fontWeight="600">
                提现
              </Text>
            </Circle>
            <Circle
              onClick={() => router.push('/recharge')}
              size="70px"
              shadow="lg"
              bg="gray.700"
              color="white"
              flexDirection="column"
            >
              <Icon fontSize="30px" as={BiDollarCircle} />
              <Text fontSize="10px" fontWeight="600">
                充值
              </Text>
            </Circle>
            <Circle
              onClick={() => router.push('/news')}
              size="70px"
              shadow="lg"
              bg="gray.700"
              color="white"
              flexDirection="column"
            >
              <Icon fontSize="30px" as={BiNews} />
              <Text fontSize="10px" fontWeight="600">
                讯息
              </Text>
            </Circle>
            <Circle
              onClick={() => router.push('/profile')}
              size="70px"
              shadow="lg"
              bg="gray.700"
              color="white"
              flexDirection="column"
            >
              <Icon fontSize="30px" as={BiUser} />
              <Text fontSize="10px" fontWeight="600">
                设置
              </Text>
            </Circle>
          </HStack>
        </Box>

        <SimpleGrid
          columns={2}
          mt="60px"
          fontSize="xl"
          color="gray.500"
          fontWeight="bold"
          textAlign="center"
          p="10px"
          spacing="15px"
        >
          <Box {...linkItemProps} onClick={() => router.push('/bankcard')}>
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
          )}
        </SimpleGrid>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default my
