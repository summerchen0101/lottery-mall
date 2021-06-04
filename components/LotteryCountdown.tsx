import useCurrentQishu from '@/service/useCurrentQishu'
import useCountdown from '@/utils/useCountdown'
import useHelper from '@/utils/useHelper'
import { Text } from '@chakra-ui/layout'
import React from 'react'

export default function LotteryCountdown() {
  const { data: qishuData } = useCurrentQishu()
  const { secToTimer } = useHelper()
  const { countdown } = useCountdown(
    qishuData?.countdown - qishuData?.close_time,
  )
  return (
    <Text fontSize="lg" flex="1" textAlign="center">{`00:${secToTimer(
      countdown,
    )}`}</Text>
  )
}
