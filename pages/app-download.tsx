import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TextCopy from '@/components/TextCopy'
import { Button, ButtonProps } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Center,
  Heading,
  HStack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { BiX } from 'react-icons/bi'

const buttonProps: StackProps = {
  pos: 'relative',
  w: '78%',
  h: '70px',
  px: '4',
  alignItems: 'center',
  // flexDir: 'column',
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
      <Box
        w="100%"
        h="100%"
        bgImage="url('/img/bg-appdownload.jpg')"
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Icon
          as={BiX}
          fontSize="40px"
          color="#fff"
          pos="fixed"
          top="15px"
          right="15px"
          onClick={() => router.back()}
        />
        <Center w="full" mt="2rem">
          <Image src="/img/logo.png" boxSize="138px" />
        </Center>

        <Center mb="10px">
          <Text color="white" fontSize="2.1rem" fontWeight="600">
            GEM100
          </Text>
        </Center>
        <VStack spacing="5">
          <HStack
            {...buttonProps}
            onClick={() =>
              window.open(
                'https://www.akoya-jp.com/down?pckId=3cb1a355ea734eb880641d2514e04020',
                'IOS APP',
              )
            }
          >
            <Box
              as="i"
              className="ic-iOS iconfont"
              fontSize="28px"
              w="33px"
              lineHeight="33px"
              textAlign="center"
            ></Box>
            <VStack spacing="0" alignItems="flex-start">
              <Text fontSize="1.1rem" fontWeight="600">
                下载苹果版 | for iPhone
              </Text>
              <Text fontSize="sm" mt="1">
                支援 iOS 10.0 以上 | iOS 10.0 +
              </Text>
            </VStack>
          </HStack>
          <HStack
            {...buttonProps}
            onClick={() => router.push('/app/android.apk')}
          >
            <Box
              as="i"
              className="ic-android iconfont"
              fontSize="28px"
              w="33px"
              lineHeight="33px"
              textAlign="center"
            ></Box>
            <VStack spacing="0" alignItems="flex-start">
              <Text fontSize="1.1rem" fontWeight="600">
                下载安卓版 | for Android
              </Text>
              <Text fontSize="sm" mt="1">
                支援安卓 5.0 以上 | Android 5.0 +
              </Text>
            </VStack>
          </HStack>
          <TextCopy text={website}>
            <HStack {...buttonProps}>
              <Box
                as="i"
                className="ic-wechat iconfont"
                fontSize="28px"
                w="33px"
                lineHeight="33px"
                textAlign="center"
              ></Box>
              <VStack spacing="0" alignItems="flex-start">
                <Text fontSize="1.1rem" fontWeight="600">
                  微信玩家请用手机浏览器
                </Text>
                <Text fontSize="sm" mt="1">
                  点击复制网址 | click to copy URL
                </Text>
              </VStack>
            </HStack>
          </TextCopy>
        </VStack>
        <VStack
          pos="fixed"
          bottom="0"
          padding="15px 8px"
          bg="rgba(0,0,0,.5)"
          color="#8a8a8a"
          fontSize="xs"
          spacing="0"
          alignItems="flex-start"
        >
          <Text>若APP使用上有困难，建议使用 Chrome 浏览器，或联系客服人员</Text>
          <Text>
            We recommend Chrome, or contact customer service if you have any
            problem.
          </Text>
        </VStack>
      </Box>
    </Layout>
  )
}
