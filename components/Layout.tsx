import { Box, BoxProps, Flex } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'
import MetaHead from './MetaHead'

const Layout: React.FC = ({
  children,
  ...props
}: { children: ReactNode } & BoxProps) => {
  return (
    <Flex bg="gray.100" h="100%" direction="column" {...props}>
      <MetaHead />
      {children}
    </Flex>
  )
}

export default Layout
