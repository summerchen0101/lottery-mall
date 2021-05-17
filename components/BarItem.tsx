import { Box } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

interface BarItemProps {
  children?: ReactNode
  onClick?: () => void
}

export default function BarItem({ children, onClick }: BarItemProps) {
  return (
    <Box
      bg="white"
      shadow="md"
      px="15px"
      py="15px"
      borderLeftWidth="4px"
      borderColor="purple.600"
      borderRadius="md"
      fontWeight="600"
      textAlign="center"
      color="gray.700"
      fontSize="lg"
      onClick={onClick}
    >
      {children}
    </Box>
  )
}
