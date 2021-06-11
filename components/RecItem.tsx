import useTransfer from '@/utils/useTransfer'
import { HStack, Spacer, Text } from '@chakra-ui/layout'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
interface RecItemProps {
  title?: string
  num?: number
  onClick?: () => void
}
export default function RecItem({ title, num, onClick }: RecItemProps) {
  const { toCurrency } = useTransfer()
  return (
    <HStack
      bg="transparent"
      h="55px"
      cursor="pointer"
      px="15px"
      borderBottom="1px"
      borderColor="rgba(255,255,255,.2)"
      onClick={onClick}
    >
      <Text fontWeight="600" fontSize="lg" color="#fff">
        {title}
      </Text>
      <Spacer />
      <Text fontSize="xl" color="brand.500">
        {toCurrency(num, 0)}
      </Text>
      <IoIosArrowForward color="gray.400" fontSize="20px" />
    </HStack>
  )
}
