import FooterNav from '@/components/FooterNav'
import HomeIconBtn from '@/components/HomeIconBtn'
import Layout from '@/components/Layout'
import useSiteParams from '@/service/useSiteParams'
import Icon from '@chakra-ui/icon'
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import FastMarquee from 'react-fast-marquee'
import { BiVolume } from 'react-icons/bi'
import { HiUserCircle } from 'react-icons/hi'

export default function home() {
  const { marquee, video, isLoading } = useSiteParams()
  const router = useRouter()
  return (
    <Layout>
      <Center h="100px" bg="pink.500" color="white">
        BANNER
      </Center>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box flex="1" overflowY="auto">
          <AspectRatio maxW="full" ratio={16 / 9}>
            <video controls loop autoPlay>
              <source src="/companyfilm.mp4" type="video/mp4" />
              Your browser does not support playing this Video
            </video>
          </AspectRatio>
          <HStack px="3" bg="gray.500" h="30px" color="white">
            <Icon as={BiVolume} fontSize="20px" />
            <FastMarquee
              gradient={false}
              style={{ height: 'auto' }}
              speed={50}
              delay={2}
            >
              <Text>{marquee}</Text>
            </FastMarquee>
          </HStack>
          <SimpleGrid columns={3} spacing="3" m="3">
            <HomeIconBtn onClick={() => router.push('/faq')}>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  平台规章
                </Text>
              </Stack>
            </HomeIconBtn>
            <HomeIconBtn onClick={() => router.push('/bankcard')}>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  实名资料
                </Text>
              </Stack>
            </HomeIconBtn>
            <HomeIconBtn onClick={() => router.push('/news')}>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  查看公告
                </Text>
              </Stack>
            </HomeIconBtn>
            <HomeIconBtn onClick={() => router.push('/recharge')}>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  充值增仓
                </Text>
              </Stack>
            </HomeIconBtn>
            <HomeIconBtn onClick={() => router.push('/lottery')}>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  开始投资
                </Text>
              </Stack>
            </HomeIconBtn>
            <HomeIconBtn>
              <Stack align="center" spacing="0">
                <Icon as={HiUserCircle} fontSize="40px" color="purple.500" />
                <Text fontWeight="bold" color="gray.500">
                  G币提现
                </Text>
              </Stack>
            </HomeIconBtn>
          </SimpleGrid>
          <Divider borderColor="gray.300" />
          <Box px="3" pb="5">
            <Text textAlign="center" my="5">
              - GEM介紹 -
            </Text>
            <Text color="gray.500" fontSize="sm" lineHeight="6">
              全球新兴市场「GEM」是一家资产达34亿美元的另类投资集团，管理着一系列专注于全球新兴市场的投资工具。
              <br />
              GEM的投资工具为集团及其投资者提供了涵盖全球私人投资范围的资产类别的多元化投资组合，并且开放于各国商品进行批发转售以及物价，并且在GEM100平台上招募投资人进行投资标物赚取获利。
              <br />
              每个投资系统以及平台都有不同程度的运营控制，风险调整后的回报和流动性状况。全球一系列资金和投资工具为GEM及其合作伙伴提供了以下方面的投资机会：中小型企业管理买断，公开募股的私人投资（PIPE）和精选的风险投资。
              <br />
              GEM100即为GEM期货交易投资所属平台，提供100种商城品种给予投资者进行交易，在于2021年2月正式发行于中国开放交易，2021年3月15日GEM已与中信集团（中国国际信托投资公司）合作，中信集团是中国最大的本土跨国公司，总资产达1250亿美元，拥有44个子公司，并在全球拥有真正的影响力。特别专注于亚洲和非洲的有色金属、货轮交易、纺织商品、上柜名牌、家用电子、苹果手机...等多项商品概念。
            </Text>
          </Box>
          <Center h="150px" bg="gray.300">
            IMAGE
          </Center>
        </Box>
      )}

      <FooterNav />
    </Layout>
  )
}
