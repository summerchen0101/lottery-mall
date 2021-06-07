import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { InviteStatus } from '@/lib/enums'
import { memberTypeOpts } from '@/lib/options'
import useMemberList from '@/service/useMemberList'
import useOnlineMembers from '@/service/useOnlineMembers'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
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
  const { onlineMembers, isLoading, total, refresh } = useOnlineMembers()

  return (
    <Layout>
      <HeaderTitleBar
        back
        backPath="/agent"
        title="会员管理"
        extra={
          <Icon
            as={isLoading ? Spinner : BiRefresh}
            fontSize="20px"
            onClick={() => refresh()}
          />
        }
      />
      <HStack bg="gray.700" color="gray.200" mb="3" h="40px" px="4">
        <Text>在线总人数： {total || '-'} 人</Text>
      </HStack>

      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing="3">
              {onlineMembers?.map((t) => (
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
                  <Text>
                    最后登入： {t.login_time}
                    <br />({loginDuration(t.login_time)}
                    天未登入)
                  </Text>
                  <Text>个人余额： {t.money}</Text>
                  <Text>登入IP {t.login_ip}</Text>
                  <HStack>
                    <Button
                      colorScheme="red"
                      size="sm"
                      flex="1"
                      onClick={() => router.push(`/agent/bet-records/${t.id}`)}
                    >
                      今日下单记录
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
