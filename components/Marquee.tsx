import { Box, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'

const Marquee: React.FC = ({ children }) => {
  return (
    <Box className="marquee-box" py="2" ml="2">
      <Text color="gray.700" fontSize="13px">
        {children}
      </Text>
    </Box>
  )
}

export default Marquee
