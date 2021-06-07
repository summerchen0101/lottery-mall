import Icon from '@chakra-ui/icon'
import { HStack, Text } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'
import { HiChevronRight } from 'react-icons/hi'

interface ListItemProps {
  children: ReactNode
  onClick?: () => void
}
export default function ListItem({ children, onClick }: ListItemProps) {
  return (
    <HStack
      bg="contentBg.500"
      h="60px"
      px="15px"
      justify="space-between"
      borderBottom="1px"
      onClick={onClick}
    >
      <Text fontSize="lg" fontWeight="600" color="#fff">
        {children}
      </Text>
      <Icon as={HiChevronRight} fontWeight="600" fontSize="24px" color="#fff" />
    </HStack>
  )
}
