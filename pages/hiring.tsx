import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box, Divider, Text } from '@chakra-ui/layout'
import React from 'react'

export default function hiring() {
  return (
    <Layout>
      <HeaderTitleBar back title="人才招聘" />
      <Box p="20px" flex="1" overflowY="auto">
        <Text fontSize="lg" color="purple.600" fontWeight="600" mb="2">
          投资分析师
        </Text>
        <Text color="gray.600" fontWeight="600" mb="1">
          职位描述
        </Text>
        <Text color="gray.500">
          收集信息，进行研究并分析跨多个部门的公司。为GEM的投资团队提供分析和资产评估支持。为全球各行各业的战略发展和投资机会提供意见。要求对创业板正在考虑的公司的财务报表进行详细审查。使用财务分析来确定GEM的新投资机会，进行研究并收集有关行业和潜在竞争对手的适当信息。一旦确定，他们将主动向全球的C级高管发送电子邮件并打电话给他们，并为投资团队建立电话/会议。
        </Text>
        <Text color="gray.600" fontWeight="600" mb="1" mt="4">
          工作要求
        </Text>
        <Text color="gray.500">
          必须拥有金融，金融数学或相关专业的学士学位或同等学历。还必须具有彭博分析和报告，外汇汇率的时间序列分析，财务数据的技术分析，金融交易经验和代码（Mat
          Lab R Studio）方面的经验。
        </Text>
        <Text color="gray.600" fontWeight="600" mb="1" mt="4">
          投履地址
        </Text>
        <Text color="gray.500">
          GEM Ventures Ltd.
          <br />
          收件人：Christopher F. Brown，董事9 West 57th Street，49th Floor，New
          York，NY 10019
        </Text>
      </Box>

      <FooterNav />
    </Layout>
  )
}
