import Icon from '@chakra-ui/icon'
import { HStack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import {
  BiCog,
  BiFileFind,
  BiHomeAlt,
  BiPurchaseTag,
  BiStoreAlt,
} from 'react-icons/bi'

function FooterNav() {
  const router = useRouter()
  return (
    <HStack
      bottom="0"
      zIndex="9"
      h="60px"
      justify="center"
      fontSize="26px"
      spacing="45px"
      bg="purple.700"
      color="white"
      shadow="lg"
      // borderTopWidth="2px"
      // borderTopColor="gray.300"
    >
      <Icon as={BiHomeAlt} onClick={() => router.push('/home')} />
      <Icon as={BiStoreAlt} onClick={() => router.push('/lottery')} />
      <Icon as={BiPurchaseTag} onClick={() => router.push('/activity')} />
      <Icon as={BiFileFind} onClick={() => router.push('/bet-rec')} />
      <Icon as={BiCog} onClick={() => router.push('/my')} />
    </HStack>
  )
}

export default FooterNav
