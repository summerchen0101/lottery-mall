import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import TeamSearchPopup, { TeamSearchForm } from '@/components/TeamSearchPopup'
import { InviteStatus } from '@/lib/enums'
import { rechargeStatusOpts } from '@/lib/options'
import useTeamBettingRec, {
  TeamBettingRecReq,
} from '@/service/useTeamBettingRec'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Box, Center, HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function teamBettingRec() {
  const { toOptionName, toCurrency } = useTransfer()
  const [searchData, setSearchData] = useState<TeamBettingRecReq>({
    created_at1: moment().format('YYYY-MM-DD'),
    created_at2: moment().format('YYYY-MM-DD'),
  })
  const [isShowSearch, setIsShowSearch] = useState(false)
  const router = useRouter()
  const { bettingList, isLoading, bet_money, profit, win } = useTeamBettingRec(
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
        title="团队下单"
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
          下单时间：{searchData.created_at1} ~ {searchData.created_at2}
        </Text>
        <Text>总下单：{toCurrency(+bet_money)}</Text>
        <Text>总收益：{toCurrency(+profit)}</Text>
      </Box>

      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing="3">
              {bettingList?.map((t) => (
                <Box key={t.id} borderRadius="md" overflow="hidden">
                  <Center bg="yellow.500" h="28px">
                    <Text color="gray.900" fontWeight="600">
                      下单成功
                    </Text>
                  </Center>
                  <Stack
                    spacing="1"
                    bg="gray.700"
                    p="4"
                    color="gray.300"
                    fontSize="sm"
                  >
                    <Text>{t.name}</Text>
                    <Text>
                      {t.lottery} NO.{t.qishu}单
                    </Text>
                    <Text>{t.created_at}</Text>
                    <HStack fontSize="xl">
                      <Text color="yellow.500">G币 {t.total_price}</Text>
                      <Spacer />
                      <Text color="white">{t.profit}</Text>
                    </HStack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </>
        )}
        <TeamSearchPopup
          isOpen={isShowSearch}
          onClose={() => setIsShowSearch(false)}
          title="团队下单查询"
          onChange={onSubmit}
        />
      </Box>
    </Layout>
  )
}
