import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TeamSearchPopup, { TeamSearchForm } from '@/components/TeamSearchPopup'
import { InviteStatus } from '@/lib/enums'
import { rechargeStatusOpts } from '@/lib/options'
import useTeamWithdrawRec, {
  TeamWithdrawRecReq,
} from '@/service/useTeamWithdrawRec'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Box, Center, HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function teamWithdrawRec() {
  const { toOptionName, toCurrency } = useTransfer()
  const [searchData, setSearchData] = useState<TeamWithdrawRecReq>({
    created_at1: moment().format('YYYY-MM-DD'),
    created_at2: moment().format('YYYY-MM-DD'),
  })
  const [isShowSearch, setIsShowSearch] = useState(false)
  const router = useRouter()
  const { rechargeList, isLoading, apply, money } = useTeamWithdrawRec(
    searchData,
  )

  const onSubmit = useCallback(
    async (d: TeamSearchForm & { startDate: Date; endDate: Date }) => {
      setSearchData({
        created_at1: moment(d.startDate).format('YYYY-MM-DD'),
        created_at2: moment(d.endDate).format('YYYY-MM-DD'),
        username: d.type === 'username' ? d.keyword : undefined,
        uid: d.type === 'uid' ? d.keyword : undefined,
      })
    },
    [],
  )
  return (
    <Layout>
      <HeaderTitleBar
        back
        backPath="/agent"
        title="团队提现"
        extra={
          <Icon
            as={BiSearch}
            fontSize="20px"
            onClick={() => setIsShowSearch(true)}
          />
        }
      />

      <Box bg="gray.700" color="gray.300" mb="3" px="4" py="2" fontSize="sm">
        <Text>
          提现时间：{searchData.created_at1} ~ {searchData.created_at2}
        </Text>
        <Text>总申请提现余额：{toCurrency(+apply)}</Text>
        <Text>实收总金额：{toCurrency(+money)}</Text>
      </Box>

      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing="3">
              {rechargeList?.map((t) => (
                <Box key={t.id} borderRadius="md" overflow="hidden">
                  <Stack bg="gray.700" p="4" color="gray.300" fontSize="sm">
                    <HStack>
                      <Text>{t.created_at}</Text>
                      <Spacer />
                      <Tag colorScheme="red">
                        {toOptionName(rechargeStatusOpts, t.status)}
                      </Tag>
                    </HStack>
                    <Text>
                      {t.description} / 会员-{t.uid}
                    </Text>
                    <HStack>
                      <Text>实际金额 / 人民币</Text>
                      <Spacer />
                      <Text fontSize="25px" color="yellow.300">
                        {toCurrency(+t.money)}
                      </Text>
                    </HStack>
                  </Stack>
                  <Center bg="gray.600" fontSize="sm" color="gray.300" h="25px">
                    <Text>订单号：{t.order_sn}</Text>
                  </Center>
                </Box>
              ))}
            </Stack>
          </>
        )}
        <TeamSearchPopup
          isOpen={isShowSearch}
          onClose={() => setIsShowSearch(false)}
          title="团队提现查询"
          onChange={onSubmit}
        />
      </Box>
    </Layout>
  )
}
