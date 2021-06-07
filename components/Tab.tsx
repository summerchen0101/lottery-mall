import { Box } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

const Tab: React.FC<{
  active?: boolean
  children?: ReactNode
  onClick?: () => void
}> = ({ active, children, onClick }) => {
  return (
    <Box
      cursor="pointer"
      borderColor={active ? 'brand.500' : 'transparent'}
      borderBottomWidth="2px"
      pb="2"
      onClick={onClick}
      color="white"
      px="3"
      fontWeight="600"
    >
      {children}
    </Box>
  )
}

export default Tab
