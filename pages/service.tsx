import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import { Image } from '@chakra-ui/image'
import { Box, Center, Spacer, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/dist/client/router'
import QRCode from 'qrcode'
import React, { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const invite: React.FC = () => {
  const [qrcode, setQrcode] = useState('')
  const { user } = useGlobalProvider()
  const router = useRouter()
  const { fetchUserInfo } = useService()
  const promoLink = useRef('')
  const toast = useToast()

  if (process.browser) {
    promoLink.current = `${location.origin}/p/${user?.promo_code}`
  }

  const createQrcode = async () => {
    const dataString = await QRCode.toDataURL(promoLink.current)
    setQrcode(dataString)
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])
  useEffect(() => {
    if (user) createQrcode()
  }, [user])
  return (
    <Layout>
      <HeaderTitleBar back title="ST线上客服" />
      <Box mt="150px" align="center">
        <Image src={qrcode} boxSize="300px" />
        <Text
          className="text-blue"
          mt="20px"
          letterSpacing="1px"
          fontWeight="600"
        >
          扫一扫上面的二维码图案，加我微信
        </Text>
      </Box>

      <FooterNavBar />
    </Layout>
  )
}

export default invite
