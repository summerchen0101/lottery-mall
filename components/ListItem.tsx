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
      bg="white"
      h="60px"
      px="15px"
      borderRadius="md"
      shadow="md"
      justify="space-between"
      borderLeftWidth="4px"
      borderColor="purple.600"
      onClick={onClick}
    >
      <Text fontSize="lg" fontWeight="600" color="gray.700">
        {children}
      </Text>
      <Icon
        as={HiChevronRight}
        fontWeight="600"
        fontSize="23px"
        color="purple.600"
      />
    </HStack>
  )
}
