import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import {
  BiCog,
  BiFileFind,
  BiHomeAlt,
  BiPurchaseTag,
  BiStoreAlt,
} from 'react-icons/bi'

function FooterNav() {
  const router = useRouter()
  return (
    <Flex className="footer">
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/home'),
        })}
        onClick={() => router.push('/home')}
      >
        <Box as="i" className="ic-home iconfont"></Box>
        <Text>首页</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/lottery'),
        })}
        onClick={() => router.push('/lottery')}
      >
        <Box as="i" className="ic-tags iconfont"></Box>
        <Text>GEM</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/activity'),
        })}
        onClick={() => router.push('/activity')}
      >
        <Box as="i" className="ic-love iconfont"></Box>
        <Text>活动</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/bet-rec'),
        })}
        onClick={() => router.push('/bet-rec')}
      >
        <Box as="i" className="ic-shopping iconfont"></Box>
        <Text>记录</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/my'),
        })}
        onClick={() => router.push('/my')}
      >
        <Box as="i" className="ic-user iconfont"></Box>
        <Text>我的</Text>
      </div>
      {/* <Icon as={BiHomeAlt} onClick={() => router.push('/home')} />
      <Icon as={BiStoreAlt} onClick={() => router.push('/lottery')} />
      <Icon as={BiPurchaseTag} onClick={() => router.push('/activity')} />
      <Icon as={BiFileFind} onClick={() => router.push('/bet-rec')} />
      <Icon as={BiCog} onClick={() => router.push('/my')} /> */}
    </Flex>
  )
}

export default FooterNav
