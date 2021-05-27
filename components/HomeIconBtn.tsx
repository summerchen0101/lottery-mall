import { Center } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

interface HomeIconBtnProps {
  children?: ReactNode
  onClick?: () => void
}

export default function HomeIconBtn({ children, onClick }: HomeIconBtnProps) {
  return (
    <Center h="80px" onClick={onClick} cursor="pointer">
      {children}
    </Center>
  )
}
