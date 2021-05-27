import Icon from '@chakra-ui/icon'
import { HStack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiClock, HiHome, HiShoppingCart, HiStar, HiUser } from 'react-icons/hi'

function FooterNav() {
  const router = useRouter()
  return (
    <HStack
      bottom="0"
      zIndex="9"
      h="60px"
      justify="center"
      fontSize="30px"
      spacing="35px"
      bg="white"
      shadow="lg"
      color="gray.700"
      // borderTopWidth="2px"
      // borderTopColor="gray.300"
    >
      <Icon as={HiHome} onClick={() => router.push('/home')} />
      <Icon as={HiShoppingCart} onClick={() => router.push('/lottery')} />
      <Icon as={HiStar} onClick={() => router.push('/activity')} />
      <Icon as={HiClock} onClick={() => router.push('/bet-rec')} />
      <Icon as={HiUser} onClick={() => router.push('/my')} />
    </HStack>
  )
}

export default FooterNav
