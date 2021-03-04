import { Marquee as MarqueeType } from '@/lib/types'
import { Box, HStack, Text } from '@chakra-ui/layout'
import React from 'react'

type NoticeBarProps = {
  msgs: MarqueeType[]
}

const NoticeBar = ({ msgs }: NoticeBarProps) => {
  return (
    <div className="notice-section d-flex align-items-center">
      <i className="iconfont iconnotification" />
      <Box className="marquee-box" py="2" ml="2">
        <Text className="text" color="gray.700" fontSize="13px">
          {msgs.map((t, i) => (
            <span key={i} className="mr-5">
              {t.content}
            </span>
          ))}
        </Text>
      </Box>
    </div>
  )
}

export default NoticeBar
