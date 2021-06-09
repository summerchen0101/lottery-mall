import { UserInfo } from '@/lib/types'
import useServiceLink from '@/service/useServiceLink'
import useHelper from '@/utils/useHelper'
import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { VStack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { BiMobile, BiUser } from 'react-icons/bi'

const iconProps: IconButtonProps = {
  borderRadius: 'full',
  color: 'white',
  bg: 'gray.500',
  boxSize: '50px',
  p: '2',
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
    <VStack position="fixed" right="20px" bottom="65px" spacing="3">
      {showAppBtn && (
        <IconButton
          {...iconProps}
          aria-label="app"
          as={BiMobile}
          onClick={() => router.push('/app-download')}
        />
      )}

      <IconButton
        {...iconProps}
        aria-label="service"
        as={BiUser}
        onClick={() => openServiceWin(serviceLink, userInfo)}
      />
    </VStack>
  )
}
