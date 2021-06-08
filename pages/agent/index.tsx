import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import ListItem from '@/components/ListItem'
import { NoticeType } from '@/lib/enums'
import useNoticeList from '@/service/useNoticeList'
import { Box, Stack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function agent() {
  const { noticeList, isLoading } = useNoticeList(NoticeType.Faq)
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="代理中心" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="15px">
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
            <ListItem>团队提現</ListItem>
            <ListItem>团队下单纪录</ListItem>
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default agent
