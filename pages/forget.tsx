import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const forget: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="找回密码" />
      <Box className="main-content" h="100vh">
        <div className="fotget-pw-section text-center">
          <Image
            m="auto"
            src="/images/forge_pw.png"
            width="70%"
            height="auto"
          />
          <p className="py-2 mt-4">请联络客服</p>
          <Text className="text-blue" fontSize="23px">
            0938-11002678
          </Text>
        </div>
      </Box>

      <FooterNavBar />
    </Layout>
  )
}

export default forget
