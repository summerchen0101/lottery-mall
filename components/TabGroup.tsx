import { HStack } from '@chakra-ui/layout'
import React from 'react'

const TabGroup = function ({ children, ...props }) {
  return (
    <HStack justify="space-between" px="15px" h="50px">
      {children}
    </HStack>
  )
}

export default TabGroup
