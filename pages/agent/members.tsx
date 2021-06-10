import AgentPageTabs from '@/components/AgentPageTabs'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useInviteList, { Invite } from '@/service/useInviteList'
import {
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
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

      <Box className="layout" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <HStack divider={<Text mx="2">{'>'}</Text>} mb="2" fontSize="sm">
              <Text fontSize="md" color="#fff" onClick={() => setLevels([])}>
                首页
              </Text>
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
            <Stack spacing="10px">
              {memberList?.map((t) => (
                <Box bg="contentBg.500" borderRadius="md" p="10px 15px">
                  <Text color="#fff" fontSize="md" fontWeight="600" mb="2">
                    {t.username}({t.id})
                    <Text as="span" ml="1">
                      {toOptionName(memberTypeOpts, t.type)}
                    </Text>
                  </Text>
                  <Divider mb="2" borderColor="rgba(255,255,255,.4)" />
                  <Stack
                    key={t.id}
                    color="gray.400"
                    fontSize="sm"
                    spacing="4px"
                    direction={['column']}
                  >
                    <Flex>
                      <Text w="100px">下级人数：</Text>
                      <Text color="#fff">{t.sub_count}</Text>
                    </Flex>
                    <Flex>
                      <Text w="100px">注册时间：</Text>
                      <Text color="#fff">{t.created_at}</Text>
                    </Flex>
                    <Flex>
                      <Text w="100px">最后登入：</Text>
                      <Text color="#fff">
                        {t.login_time}
                        <Text as="span" ml="1" color="gray.400">
                          ({loginDuration(t.login_time)}
                          天未登入)
                        </Text>
                      </Text>
                    </Flex>
                    <Flex>
                      <Text w="100px">个人余额：</Text>
                      <Text color="#fff">{t.money}</Text>
                    </Flex>
                    <Flex>
                      <Text w="100px">团队余额：</Text>
                      <Text color="#fff">{t.money_team}</Text>
                    </Flex>
                  </Stack>
                  <HStack w="100%" mt="2">
                    <Button
                      colorScheme="red"
                      size="sm"
                      flex="1"
                      borderRadius="3px"
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
                      borderRadius="3px"
                      flex="1"
                      onClick={() => handleShowSubs(t.username, t.id)}
                      disabled={!t.sub_count}
                    >
                      查看子下级
                    </Button>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Layout>
  )
}
