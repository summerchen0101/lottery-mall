import { UserInfo } from '@/lib/types'
import useServiceLink from '@/service/useServiceLink'
import useHelper from '@/utils/useHelper'
import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { FaMobileAlt } from 'react-icons/fa'
import { IoIosPhonePortrait } from 'react-icons/io'
const iconProps: IconButtonProps = {
  borderRadius: 'full',
  color: 'white',
  bg: 'rgba(61, 68, 72, 0.5)',
  boxSize: '50px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.6)',
  'aria-label': '',
}

interface FloatNavProps {
  showAppBtn?: boolean
  userInfo?: UserInfo
}

export default function FloatNav({ showAppBtn, userInfo }: FloatNavProps) {
  const router = useRouter()
  const { openServiceWin } = useHelper()
  const { serviceLink } = useServiceLink()

  return (
    <VStack position="fixed" right="15px" bottom="65px" spacing="3">
      {showAppBtn && (
        <Center
          {...iconProps}
          aria-label="app"
          onClick={() => router.push('/app-download')}
        >
          <FaMobileAlt fontSize="28px" />
        </Center>
      )}

      <Box
        {...iconProps}
        aria-label="service"
        // as={BiUser}
        onClick={() => openServiceWin(serviceLink, userInfo)}
      >
        <Image src="./img/ic-service.png"></Image>
      </Box>
    </VStack>
  )
}
