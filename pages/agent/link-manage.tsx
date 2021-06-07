import AgentPageTabs from '@/components/AgentPageTabs'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useInviteList from '@/service/useInviteList'
import { Box, HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React, { useCallback, useMemo, useState } from 'react'
import { InviteStatus } from '@/lib/enums'
import useTransfer from '@/utils/useTransfer'
import { inviteStatusOpts, memberTypeOpts } from '@/lib/options'
import { Button } from '@chakra-ui/button'
import TextCopy from '@/components/TextCopy'
import InviteQrcodePopup from '@/components/InviteQrcodePopup'
import QRcode from 'qrcode'
const statusColorMap = {
  [InviteStatus.On]: 'green.500',
  [InviteStatus.Off]: 'red.500',
}

export default function createInvite() {
  const { toOptionName } = useTransfer()
  const [isShowQRCode, setIsShowQRCode] = useState(false)
  const [qrcodeImg, setQrcodeImg] = useState('')
  const { inviteList, isLoading } = useInviteList()
  const baseUrl = useMemo(() => {
    if (process.browser) {
      return `${location.protocol}//${location.host}/register`
    }
  }, [])

  const handleQrcodeClicked = useCallback(async (code) => {
    const imgSrc = await QRcode.toDataURL(`${baseUrl}/${code}`)
    setQrcodeImg(imgSrc)
    setIsShowQRCode(true)
  }, [])

  return (
    <Layout>
      <HeaderTitleBar back title="链结管理" />
      <AgentPageTabs />

      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack>
            {inviteList?.map((t) => (
              <Box key={t.id} bg="gray.700" borderRadius="md" p="4">
                <HStack>
                  <Text>{t.name}</Text>
                  <Spacer />
                  <Text color={statusColorMap[t.status]}>
                    {toOptionName(inviteStatusOpts, t.status)}
                  </Text>
                </HStack>
                <Text>
                  开户类型：
                  {toOptionName(memberTypeOpts, t.type)}
                </Text>
                <Text>
                  注册链结：
                  {t.invite}
                </Text>
                <HStack>
                  <TextCopy text={t.invite}>
                    <Button colorScheme="red" size="sm">
                      复制邀请码
                    </Button>
                  </TextCopy>
                  <TextCopy text={`${baseUrl}/${t.invite}`}>
                    <Button colorScheme="red" size="sm">
                      复制链结
                    </Button>
                  </TextCopy>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleQrcodeClicked(t.invite)}
                  >
                    QRCode
                  </Button>
                  <Button colorScheme="red" size="sm">
                    停用
                  </Button>
                </HStack>
              </Box>
            ))}
          </Stack>
        )}
        <InviteQrcodePopup
          isOpen={isShowQRCode}
          onClose={() => setIsShowQRCode(false)}
          qrcodeImg={qrcodeImg}
        />
      </Box>
    </Layout>
  )
}
