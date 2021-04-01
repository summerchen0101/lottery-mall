import { Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Fade } from '@chakra-ui/transition'
import React from 'react'

function LoadingHolder({ isLoading }: { isLoading?: boolean }) {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Center p="40px" h="full" w="full" pos="fixed" top="0" zIndex="99">
        <Spinner size="xl" color="rgba(0,0,0,0.3)" thickness="3px" />
      </Center>
    </Fade>
  )
}

export default LoadingHolder
