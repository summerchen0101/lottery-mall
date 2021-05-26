import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/layout'
import React from 'react'

interface RecItemProps {
  title?: string
  num?: number
  onClick?: () => void
}
export default function RecItem({ title, num, onClick }: RecItemProps) {
  const { toCurrency } = useTransfer()
  return (
    <HStack
      bg="white"
      h="60px"
      px="15px"
      borderRadius="md"
      shadow="md"
      justify="space-between"
      onClick={onClick}
    >
      <Text fontWeight="600" fontSize="lg">
        {title}
      </Text>
      <Text fontWeight="bold" fontSize="xl" color="purple.600">
        ¥ {toCurrency(num, 0)}
      </Text>
    </HStack>
  )
}
