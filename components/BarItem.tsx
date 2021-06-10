import { Box } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

interface BarItemProps {
  children?: ReactNode
  onClick?: () => void
}

export default function BarItem({ children, onClick }: BarItemProps) {
  return (
    <Box
      w="100%"
      // h="3rem"
      bg="contentBg.500"
      px="15px"
      py="10px"
      borderRadius="md"
      fontWeight="600"
      textAlign="center"
      color="#fff"
      fontSize="lg"
      onClick={onClick}
    >
      {children}
    </Box>
  )
}
