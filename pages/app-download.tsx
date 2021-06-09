import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TextCopy from '@/components/TextCopy'
import { Button, ButtonProps } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Center, Heading, Text, VStack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { BiX } from 'react-icons/bi'

const buttonProps: ButtonProps = {
  size: 'lg',
  w: '80%',
  h: '70px',
  colorScheme: 'brand',
  flexDir: 'column',
  bg: 'transparent',
  color: 'white',
  borderColor: 'white',
  borderRadius: 'full',
  borderWidth: '1px',
}

export default function appDownload() {
  const router = useRouter()
  const website = useMemo(() => {
    if (process.browser) {
      return `${location.protocol}//${location.host}`
    }
  }, [])
  return (
    <Layout>
      <Icon
        as={BiX}
        fontSize="40px"
        color="gray.500"
        pos="fixed"
        top="4"
        right="4"
        onClick={() => router.back()}
      />
      <Center mt="80px" mb="30px">
        <Heading color="white">GEM100</Heading>
      </Center>
      <VStack spacing="5">
        <Button
          {...buttonProps}
          onClick={() =>
            window.open(
              'https://www.akoya-jp.com/down?pckId=3cb1a355ea734eb880641d2514e04020',
              'IOS APP',
            )
          }
        >
          <Text>下载苹果版 | for iPhone</Text>
          <Text fontSize="sm" mt="1">
            支援 iOS 10.0 以上 | iOS 10.0 +
          </Text>
        </Button>
        <Button
          {...buttonProps}
          onClick={() => router.push('/app/android.apk')}
        >
          <Text>下载安卓版 | for Android</Text>
          <Text fontSize="sm" mt="1">
            支援安卓 5.0 以上 | Android 5.0 +
          </Text>
        </Button>
        <TextCopy text={website}>
          <Button {...buttonProps}>
            <Text>微信玩家请用手机浏览器</Text>
            <Text fontSize="sm" mt="1">
              点击复制网址 | click to copy URL
            </Text>
          </Button>
        </TextCopy>
      </VStack>
    </Layout>
  )
}
