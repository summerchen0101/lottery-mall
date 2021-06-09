import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

export default function about() {
  return (
    <Layout>
      <HeaderTitleBar back title="GEM介紹" />
      <Box className="layout" flex="1" overflowY="auto">
        <Text color="#fff" fontSize="md" lineHeight="6">
          全球新兴市场「GEM」是一家资产达34亿美元的另类投资集团，管理着一系列专注于全球新兴市场的投资工具。
          <br />
          GEM的投资工具为集团及其投资者提供了涵盖全球私人投资范围的资产类别的多元化投资组合，并且开放于各国商品进行批发转售以及物价，并且在GEM100平台上招募投资人进行投资标物赚取获利。
          <br />
          每个投资系统以及平台都有不同程度的运营控制，风险调整后的回报和流动性状况。全球一系列资金和投资工具为GEM及其合作伙伴提供了以下方面的投资机会：中小型企业管理买断，公开募股的私人投资（PIPE）和精选的风险投资。
          <br />
          GEM100即为GEM期货交易投资所属平台，提供100种商城品种给予投资者进行交易，在于2021年2月正式发行于中国开放交易，2021年3月15日GEM已与中信集团（中国国际信托投资公司）合作，中信集团是中国最大的本土跨国公司，总资产达1250亿美元，拥有44个子公司，并在全球拥有真正的影响力。特别专注于亚洲和非洲的有色金属、货轮交易、纺织商品、上柜名牌、家用电子、苹果手机...等多项商品概念。
        </Text>
        <Image mt="2" w="full" src="/img/index-photo.jpeg"></Image>
      </Box>

      <FooterNav />
    </Layout>
  )
}
