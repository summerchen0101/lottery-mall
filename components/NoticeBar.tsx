import { Marquee as MarqueeType } from '@/lib/types'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'
import Marquee from './Marquee'

type NoticeBarProps = {
  msgs: MarqueeType[]
}

const NoticeBar = ({ msgs }: NoticeBarProps) => {
  return (
    <div className="notice-section d-flex align-items-center">
      <i className="iconfont iconnotification" />
      <Box className="marquee-box" py="2" ml="2">
        {msgs.map((t, i) => (
          <Text key={i} color="gray.700" fontSize="13px">
            {t.content}
          </Text>
        ))}
      </Box>
    </div>
  )
}

export default NoticeBar
