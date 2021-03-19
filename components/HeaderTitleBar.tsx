import Icon from '@chakra-ui/icon'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { ReactNode } from 'react'
import { HiArrowLeft } from 'react-icons/hi'

const HeaderTitleBar: React.FC<{
  title?: ReactNode
  extra?: ReactNode
  back?: boolean
  backPath?: string
}> = ({ back, backPath, title, extra }) => {
  const router = useRouter()
  return (
    <HStack
      display="fixed"
      top="0"
      w="100vw"
      bg="purple.700"
      color="white"
      h="50px"
      align="center"
      px="15px"
    >
      <Text
        as="a"
        hidden={!back}
        onClick={() => (backPath ? router.push(backPath) : router.back())}
      >
        <Icon as={HiArrowLeft} fontSize="20px" />
      </Text>
      <Text>{title}</Text>
      <Box>{extra}</Box>
    </HStack>
  )
}

export default HeaderTitleBar
