import FooterNav from '@/components/FooterNav'
import HomeIconBtn from '@/components/HomeIconBtn'
import Layout from '@/components/Layout'
import NewsPopup from '@/components/NewsPopup'
import { usePopupContext } from '@/context/PopupContext'
import useSiteParams from '@/service/useSiteParams'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/react'
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
import React, { useEffect } from 'react'
import FastMarquee from 'react-fast-marquee'
import {
  BiArchiveOut,
  BiBook,
  BiCartAlt,
  BiDollarCircle,
  BiNews,
  BiStoreAlt,
  BiUser,
  BiVolume,
} from 'react-icons/bi'

export default function home() {
  const { marquee, video, isLoading } = useSiteParams()
  const [, setNewsVisible] = usePopupContext('news')
  const router = useRouter()
  useEffect(() => {
    if (router.query.n) {
      setNewsVisible(true)
    }
  }, [router])
  return (
    <Layout>
      <Box flex="1" overflowY="auto" bg="containerBg.500">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <>
            {/* <AspectRatio maxW="full" ratio={16 / 9}>
              <iframe
                title="公司影片"
                src={video}
                allowFullScreen
                allow="autoplay"
              />
            </AspectRatio> */}
            <Center w="full" h="auto">
              <Image src="/img/banner.png"></Image>
            </Center>
            <Image w="100%" src="/img/banner2.jpg"></Image>

            <SimpleGrid
              columns={3}
              spacing="3"
              m="3"
              h="168px"
              fontSize=".875rem"
              lineHeight="24px"
              color="#fff"
            >
              <HomeIconBtn onClick={() => router.push('/faq')}>
                <Stack align="center" spacing="1">
                  <Image w="2.25rem" h="auto" src="/img/ic-item-01.svg"></Image>
                  <Text>平台规章</Text>
                </Stack>
              </HomeIconBtn>
              <HomeIconBtn onClick={() => router.push('/bankcard')}>
                <Stack align="center" spacing="1">
                  <Image w="2.25rem" h="auto" src="/img/ic-item-02.svg"></Image>
                  <Text>实名资料</Text>
                </Stack>
              </HomeIconBtn>
              <HomeIconBtn onClick={() => router.push('/news')}>
                <Stack align="center" spacing="1">
                  <Image w="2.25rem" h="auto" src="/img/ic-item-03.svg"></Image>
                  <Text>查看公告</Text>
                </Stack>
              </HomeIconBtn>
              <HomeIconBtn onClick={() => router.push('/recharge')}>
                <Stack align="center" spacing="1">
                  <Image w="2.25rem" h="auto" src="/img/ic-item-04.svg"></Image>
                  <Text>充值增仓</Text>
                </Stack>
              </HomeIconBtn>
              <HomeIconBtn onClick={() => router.push('/lottery')}>
                <Stack align="center" spacing="1">
                  <Image w="2.25rem" h="auto" src="/img/ic-item-05.svg"></Image>
                  <Text>开始投资</Text>
                </Stack>
              </HomeIconBtn>
              <HomeIconBtn>
                <Stack
                  align="center"
                  spacing="1"
                  onClick={() => router.push('/withdraw')}
                >
                  <Image w="2.25rem" h="auto" src="/img/ic-item-06.svg"></Image>
                  <Text>G币提现</Text>
                </Stack>
              </HomeIconBtn>
            </SimpleGrid>
            <HStack
              px="15px"
              h="35px"
              color="brand.500"
              borderTop="1px"
              borderColor="#3d4448"
            >
              <Icon as={BiVolume} fontSize="24px" />
              <FastMarquee
                gradient={false}
                style={{ height: 'auto' }}
                speed={50}
                delay={2}
              >
                <Text color="#fff">{marquee}</Text>
              </FastMarquee>
            </HStack>
            <Box p="15px 18px" bg="contentBg.500">
              <Text fontSize="18px" lineHeight="32px" color="#fff">
                GEM 介紹
              </Text>
              <Text color="rgba(255,255,255,.6)" fontSize="sm" lineHeight="6">
                全球新兴市场「GEM」是一家资产达34亿美元的另类投资集团，管理着一系列专注于全球新兴市场的投资工具。
                <br />
                GEM的投资工具为集团及其投资者提供了涵盖全球私人投资范围的资产类别的多元化投资组合，并且开放于各国商品进行批发转售以及物价，并且在GEM100平台上招募投资人进行投资标物赚取获利。
                <br />
                每个投资系统以及平台都有不同程度的运营控制，风险调整后的回报和流动性状况。全球一系列资金和投资工具为GEM及其合作伙伴提供了以下方面的投资机会：中小型企业管理买断，公开募股的私人投资（PIPE）和精选的风险投资。
                <br />
                GEM100即为GEM期货交易投资所属平台，提供100种商城品种给予投资者进行交易，在于2021年2月正式发行于中国开放交易，2021年3月15日GEM已与中信集团（中国国际信托投资公司）合作，中信集团是中国最大的本土跨国公司，总资产达1250亿美元，拥有44个子公司，并在全球拥有真正的影响力。特别专注于亚洲和非洲的有色金属、货轮交易、纺织商品、上柜名牌、家用电子、苹果手机...等多项商品概念。
              </Text>
            </Box>
            <Image w="full" src="/img/index-photo.jpeg"></Image>
          </>
        )}
      </Box>

      <NewsPopup />

      <FooterNav />
    </Layout>
  )
}
