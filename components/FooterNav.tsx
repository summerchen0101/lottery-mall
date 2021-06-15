import useRouterWithAuth from '@/utils/useRouterWithAuth'
import { Box, Flex, Text } from '@chakra-ui/layout'
import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function FooterNav() {
  const router = useRouter()
  const { authPush } = useRouterWithAuth()
  return (
    <Flex className="footer">
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/home'),
        })}
        onClick={() => authPush('/home')}
      >
        <Box as="i" className="ic-home iconfont"></Box>
        <Text>首页</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/lottery'),
        })}
        onClick={() => authPush('/lottery')}
      >
        <Box as="i" className="ic-tags iconfont"></Box>
        <Text>GEM</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/activity'),
        })}
        onClick={() => authPush('/activity')}
      >
        <Box as="i" className="ic-love iconfont"></Box>
        <Text>活动</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/bet-rec'),
        })}
        onClick={() => authPush('/bet-rec')}
      >
        <Box as="i" className="ic-shopping iconfont"></Box>
        <Text>记录</Text>
      </div>
      <div
        className={classNames('footer-list', {
          active: router.pathname.includes('/my'),
        })}
        onClick={() => authPush('/my')}
      >
        <Box as="i" className="ic-user iconfont"></Box>
        <Text>我的</Text>
      </div>
    </Flex>
  )
}

export default FooterNav
