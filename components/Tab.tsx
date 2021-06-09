import { Box } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

const Tab: React.FC<{
  active?: boolean
  children?: ReactNode
  onClick?: () => void
}> = ({ active, children, onClick }) => {
  return (
    <Box
      bg={active ? 'brand.500' : 'contentBg.500'}
      cursor="pointer"
      // borderColor={active ? 'brand.500' : 'transparent'}
      // borderBottomWidth="2px"
      // pb="2"
      py="1"
      borderRadius="1rem"
      onClick={onClick}
      color="white"
      px="5"
      fontWeight="600"
    >
      {children}
    </Box>
  )
}

export default Tab
