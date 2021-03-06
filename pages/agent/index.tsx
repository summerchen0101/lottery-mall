import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import ListItem from '@/components/ListItem'
import { Box, Stack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function agent() {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back backPath="/my" title="代理中心" />
      <Box flex="1" overflowY="auto">
        <Stack spacing="0px">
          <ListItem onClick={() => router.push('/agent/member-create')}>
            开户中心
          </ListItem>
          <ListItem onClick={() => router.push('/agent/members')}>
            会员管理
          </ListItem>
          <ListItem onClick={() => router.push('/agent/online-members')}>
            在线会员
          </ListItem>
          <ListItem onClick={() => router.push('/agent/team-recharge')}>
            团队充值
          </ListItem>
          <ListItem onClick={() => router.push('/agent/team-withdraw')}>
            团队提現
          </ListItem>
          <ListItem onClick={() => router.push('/agent/team-betting')}>
            团队下单纪录
          </ListItem>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default agent
