import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import useRequest from '@/utils/useRequest'
import parse from 'html-react-parser'

const PolicyPage: React.FC = () => {
  const [content, setContent] = useState('')
  const API = useRequest()
  const fetchContent = async () => {
    try {
      const res = await API.getPolicyContent()
      setContent(res.data.content_mobile)
    } catch (err) {}
  }
  useEffect(() => {
    fetchContent()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="条款与规则" />
      <div className="main-content">
        <div className="about-section section-padding">
          {/* <div className="w-100 text-center py-3 mt-5">
            <Image src="/images/about_ag.png" w="90%" m="auto" />
          </div> */}
          <Box className="w-100 mt-4" whiteSpace="pre-wrap">
            {/* <span className="text-blue">ST</span> */}
            {content}
          </Box>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default PolicyPage
