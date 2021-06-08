import Icon from '@chakra-ui/icon'
import { Box, HStack, Spacer, Text } from '@chakra-ui/layout'
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
      // pos="fixed"
      top="0"
      w="100vw"
      bg="containerBg.500"
      color="white"
      h="55px"
      align="center"
      px="15px"
      display="flex"
      justifyContent="center"
    >
      <Box
        pos="absolute"
        left="15px"
        as="a"
        hidden={!back}
        onClick={() => (backPath ? router.push(backPath) : router.back())}
      >
        <Icon as={HiArrowLeft} fontSize="1.5rem" />
      </Box>
      <Text
        fontSize="1.5rem"
        letterSpacing="1px"
        fontWeight="600"
        textAlign="center"
      >
        {title}
      </Text>

      <Box pos="absolute" right="15px">
        {extra}
      </Box>
    </HStack>
  )
}

export default HeaderTitleBar
