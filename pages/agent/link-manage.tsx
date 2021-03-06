import AgentPageTabs from '@/components/AgentPageTabs'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useInviteList, { Invite } from '@/service/useInviteList'
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
import AlertPopup from '@/components/AlertPopup'
import useInviteUpdate from '@/service/useInviteStatusEdit'
import { useToast } from '@chakra-ui/toast'
import useAlert from '@/utils/useAlert'
const statusColorMap = {
  [InviteStatus.On]: 'green.500',
  [InviteStatus.Off]: 'red.500',
}

export default function createInvite() {
  const { toOptionName } = useTransfer()
  const [isShowQRCode, setIsShowQRCode] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [qrcodeImg, setQrcodeImg] = useState('')
  const [alertId, setAlertId] = useState(null)
  const { inviteList, isLoading, refresh } = useInviteList()
  const alert = useAlert()
  const {
    handler: doStatusChange,
    isLoading: isUpdateLoading,
  } = useInviteUpdate()
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
  const handleStatusChange = useCallback(
    async (id: number, status: InviteStatus) => {
      try {
        const res = await doStatusChange({
          invite_id: id,
          status,
        })
        if (res.success) {
          alert.success('???????????????')
          setIsShowAlert(false)
          refresh()
        }
      } catch (err) {}
    },
    [],
  )

  const handleDisableStatus = (id: number) => {
    setAlertId(id)
    setIsShowAlert(true)
  }
  return (
    <Layout>
      <HeaderTitleBar back backPath="/agent" title="????????????" />
      <AgentPageTabs />

      <Box p="15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="10px">
            {inviteList?.map((t) => (
              <Box
                key={t.id}
                bg="contentBg.500"
                borderRadius="md"
                p="10px 15px"
                color="gray.400"
              >
                <HStack mb="2" alignItems="center">
                  <Text color="#fff" fontWeight="600">
                    {t.name}
                  </Text>
                  <Spacer />
                  <Text
                    color="#fff"
                    px="2"
                    bg={statusColorMap[t.status]}
                    // border="1px"
                    borderRadius="full"
                    // borderColor="{statusColorMap[t.status]}"
                  >
                    {toOptionName(inviteStatusOpts, t.status)}
                  </Text>
                </HStack>
                <Text fontSize="sm">
                  ???????????????
                  {toOptionName(memberTypeOpts, t.type)}
                </Text>
                <Text fontSize="sm">
                  ???????????????
                  {t.invite}
                </Text>
                <HStack mt="2">
                  <TextCopy text={t.invite}>
                    <Button colorScheme="brand" size="sm" borderRadius="3px">
                      ???????????????
                    </Button>
                  </TextCopy>
                  <TextCopy text={`${baseUrl}/${t.invite}`}>
                    <Button colorScheme="brand" size="sm" borderRadius="3px">
                      ????????????
                    </Button>
                  </TextCopy>
                  <Button
                    colorScheme="brand"
                    size="sm"
                    borderRadius="3px"
                    onClick={() => handleQrcodeClicked(t.invite)}
                  >
                    QRCode
                  </Button>
                  {t.status === InviteStatus.On ? (
                    <Button
                      colorScheme="red"
                      size="sm"
                      borderRadius="3px"
                      onClick={() => handleDisableStatus(t.id)}
                      isLoading={isUpdateLoading}
                    >
                      ??????
                    </Button>
                  ) : (
                    <Button
                      colorScheme="green"
                      size="sm"
                      borderRadius="3px"
                      onClick={() => handleStatusChange(t.id, InviteStatus.On)}
                      isLoading={isUpdateLoading}
                    >
                      ??????
                    </Button>
                  )}
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
        <AlertPopup
          isOpen={isShowAlert}
          onClose={() => setIsShowAlert(false)}
          onConfirm={() => handleStatusChange(alertId, InviteStatus.Off)}
        >
          ?????????????????????????????????????????????????????????
        </AlertPopup>
      </Box>
    </Layout>
  )
}
