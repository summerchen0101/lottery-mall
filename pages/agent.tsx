import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const agent: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="合營計畫" />
      <div className="main-content section-padding agent-section">
        <img src="./images/agent.jpg" className="w-100" />
        {/* <button
          type="submit"
          className="btnbase primary_btn my-3 "
          onClick={() => router.push('/agent-join')}
        >
          申请加入
        </button> */}
        <Text className="font-weight-bold text-center my-4">AG的优势</Text>
        <div className="agent-content">
          <Box className="item">
            <Image src="./images/agent-brand.svg" m="auto" />
            <Text>领先的品牌</Text>
            <Text>
              提供体育博彩优惠，玩家自定义投注，创建投注和快速挑选累加器。
            </Text>
          </Box>
          <Box className="item">
            <Image src="./images/agent-commiss.svg" m="auto" />
            <Text>55%拥金</Text>
            <Text>
              我们的支付结构允许您从您的每位玩家中赚取最高55%%的佣金。
            </Text>
          </Box>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default agent
