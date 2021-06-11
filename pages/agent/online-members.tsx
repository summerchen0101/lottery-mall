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
            fontSize="26px"
            onClick={() => refresh()}
          />
        }
      />
      <HStack bg="contentBg.500" color="#fff" h="40px" px="4">
        <Text>在线总人数： {total || '-'} 人</Text>
      </HStack>

      <Box p="15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing="3">
              {onlineMembers?.map((t) => (
                <Stack
                  key={t.id}
                  bg="contentBg.500"
                  borderRadius="md"
                  p="10px 15px"
                  color="gray.400"
                  w="100%"
                  fontSize="sm"
                >
                  <Flex color="#fff" fontSize="md" fontWeight="600">
                    <Text minW="100px">
                      {t.username}({t.id})
                    </Text>

                    <Text as="span">
                      {toOptionName(memberTypeOpts, t.type)}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text minW="100px">最后登入：</Text>
                    <Text color="#fff">
                      {t.login_time}
                      <Text color="gray.400" ml="1" as="span">
                        ({loginDuration(t.login_time)}
                        天未登入)
                      </Text>
                    </Text>
                  </Flex>
                  <Flex>
                    <Text minW="100px">个人余额：</Text>
                    <Text color="#fff">{t.money}</Text>
                  </Flex>
                  <Flex>
                    <Text minW="100px">登入IP：</Text>
                    <Text color="#fff">{t.login_ip}</Text>
                  </Flex>

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
