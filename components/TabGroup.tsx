import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

const TabGroup: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="nav nav-tabs d-flex section-padding" {...props}>
      {children}
    </Box>
  )
}

export default TabGroup
