import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Image } from '@chakra-ui/react'
import useRequest from '@/utils/useRequest'

const AboutPage: React.FC = () => {
  const [content, setContent] = useState('')
  const API = useRequest()
  const fetchContent = async () => {
    try {
      const res = await API.getAboutContent()
      setContent(res.data.content_mobile)
    } catch (err) {}
  }
  useEffect(() => {
    fetchContent()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="关于ST" />
      <div className="main-content">
        <div className="about-section section-padding">
          <div className="w-100 text-center py-3 mt-5">
            <Image src="/images/about_ag.png" w="90%" m="auto" />
          </div>
          <div className="w-100 mt-2">
            {/* <span className="text-blue">ST</span> */}
            {content}
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default AboutPage
