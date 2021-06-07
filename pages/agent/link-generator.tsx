import AgentPageTabs from '@/components/AgentPageTabs'
import FieldValidateMessage from '@/components/FieldValidateMessage'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { MemberType } from '@/lib/enums'
import pattern from '@/lib/pattern'
import useCreateInvite from '@/service/useCreateInvite'

import useAlert from '@/utils/useAlert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import React from 'react'
import { useForm } from 'react-hook-form'

interface InviteFormProps {
  type: number
  name: string
}

export default function createInvite() {
  const alert = useAlert()
  const { handler: doCreateInvite, isLoading } = useCreateInvite()
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    reset,
  } = useForm<InviteFormProps>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await doCreateInvite({
        type: +d.type,
        name: d.name,
        lottery_type_id: 1,
      })
      if (res.success) {
        alert.success('新增成功')
      }
    } catch (err) {}
    reset()
  })
  return (
    <Layout>
      <HeaderTitleBar back title="生成链结" />
      <AgentPageTabs />

      <Box p="20px" flex="1" overflowY="auto">
        <Box as="form" onSubmit={onSubmit} noValidate>
          <Stack spacing="12px">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>链结名称</FormLabel>
              <Input
                name="name"
                bg="white"
                ref={register({
                  required: '不可为空',
                })}
              />
              <FieldValidateMessage error={errors.name} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.type}>
              <FormLabel>開戶类型</FormLabel>
              <RadioGroup
                name="type"
                defaultValue={MemberType.Agent.toString()}
              >
                <Stack direction="row">
                  <Radio value={MemberType.Agent.toString()} ref={register}>
                    代理
                  </Radio>
                  <Radio value={MemberType.Member.toString()} ref={register}>
                    会员
                  </Radio>
                </Stack>
              </RadioGroup>
              <FieldValidateMessage error={errors.type} />
            </FormControl>
          </Stack>
          <Button
            type="submit"
            w="full"
            colorScheme="purple"
            isLoading={isLoading}
            mt="6"
          >
            确认送出
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}
