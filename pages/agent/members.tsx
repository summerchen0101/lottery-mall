import AgentPageTabs from '@/components/AgentPageTabs'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useInviteList, { Invite } from '@/service/useInviteList'
import { Box, HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React, { useCallback, useMemo, useState } from 'react'
import { InviteStatus } from '@/lib/enums'
import useTransfer from '@/utils/useTransfer'
import { inviteStatusOpts, memberTypeOpts } from '@/lib/options'
import { Button } from '@chakra-ui/button'
import TextCopy from '@/components/TextCopy'
import InviteQrcodePopup from '@/components/InviteQrcodePopup'
import QRcode from 'qrcode'
import AlertPopup from '@/components/AlertPopup'
import useInviteUpdate from '@/service/useInviteStatusEdit'
import { useToast } from '@chakra-ui/toast'
import useAlert from '@/utils/useAlert'
import useMemberList from '@/service/useMemberList'
import { useRouter } from 'next/dist/client/router'
import moment from 'moment'
const statusColorMap = {
  [InviteStatus.On]: 'green.500',
  [InviteStatus.Off]: 'red.500',
}

export default function memberList() {
  const { toOptionName } = useTransfer()
  const [levels, setLevels] = useState<{ name: string; id: number }[]>([])
  const router = useRouter()
  const loginDuration = useCallback(
    (lastLogin: string) => moment.duration(moment().diff(lastLogin)).days(),
    [],
  )
  const { memberList, isLoading, refresh } = useMemberList(
    +levels[levels.length - 1]?.id,
  )

  const handleShowSubs = (name: string, id: number) => {
    setLevels((arr) => arr.concat({ name, id }))
  }
  return (
    <Layout>
      <HeaderTitleBar back backPath="/agent" title="会员管理" />

      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <HStack divider={<Text mx="2">{'>'}</Text>} mb="2" fontSize="sm">
              <Text onClick={() => setLevels([])}>首页</Text>
              {levels.map((t, i) => (
                <Text
                  key={t.id}
                  onClick={() =>
                    setLevels((arr) => arr.filter((_t, _i) => _i <= i))
                  }
                >
                  {t.name}
                </Text>
              ))}
            </HStack>
            <Stack spacing="3">
              {memberList?.map((t) => (
                <Stack
                  key={t.id}
                  bg="gray.700"
                  borderRadius="md"
                  p="4"
                  color="gray.200"
                  fontSize="sm"
                >
                  <Text>
                    {t.username}({t.id})
                    <Text as="span" ml="2">
                      {toOptionName(memberTypeOpts, t.type)}
                    </Text>
                  </Text>
                  <Text>下级人数： {t.sub_count}</Text>
                  <Text>注册时间： {t.created_at}</Text>
                  <Text>
                    最后登入： {t.login_time}
                    <br />({loginDuration(t.login_time)}
                    天未登入)
                  </Text>
                  <Text>个人余额： {t.money}</Text>
                  <Text>团队余额： {t.money_team}</Text>
                  <HStack>
                    <Button
                      colorScheme="red"
                      size="sm"
                      flex="1"
                      onClick={() =>
                        router.push({
                          pathname: '/agent/team-betting',
                          query: { acc: t.username },
                        })
                      }
                    >
                      今日下单记录
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      flex="1"
                      onClick={() => handleShowSubs(t.username, t.id)}
                      disabled={!t.sub_count}
                    >
                      查看子下级
                    </Button>
                  </HStack>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Layout>
  )
}
