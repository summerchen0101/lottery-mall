import FieldValidateMessage from '@/components/FieldValidateMessage'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { MemberType } from '@/lib/enums'
import pattern from '@/lib/pattern'
import useCreateMember from '@/service/useCreateMember'
import useAlert from '@/utils/useAlert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import React from 'react'
import { useForm } from 'react-hook-form'

interface MemberFormProps {
  type: string
  username: string
  password: string
  confirm_password: string
  lottery_type_id: number
}

export default function createMember() {
  const alert = useAlert()
  const { handler: doCreateMember, isLoading } = useCreateMember()
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    reset,
  } = useForm<MemberFormProps>()
  const onSubmit = handleSubmit(async (d) => {
    await doCreateMember({
      type: +d.type,
      username: d.username,
      password: d.password,
      confirm_password: d.confirm_password,
      lottery_type_id: d.lottery_type_id,
    })
    alert.success('新增成功')
    reset()
  })
  return (
    <Layout>
      <HeaderTitleBar back title="开户中心" />
      <TabGroup justifyContent="space-between">
        <Tab active>新增用户</Tab>
        <Tab>生成链结</Tab>
        <Tab>链结管理</Tab>
      </TabGroup>

      <Box p="20px" flex="1" overflowY="auto">
        <Box as="form" onSubmit={onSubmit} noValidate>
          <Stack spacing="12px">
            <FormControl isRequired isInvalid={!!errors.type}>
              <FormLabel>注册类型</FormLabel>
              <RadioGroup name="type" defaultValue={MemberType.Agent}>
                <Stack direction="row">
                  <Radio value={MemberType.Agent} ref={register}>
                    代理
                  </Radio>
                  <Radio value={MemberType.Member} ref={register}>
                    会员
                  </Radio>
                </Stack>
              </RadioGroup>
              <FieldValidateMessage error={errors.type} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.username}>
              <FormLabel>会员帐号</FormLabel>
              <Input
                name="username"
                bg="white"
                ref={register({
                  required: '不可为空',
                  pattern: {
                    value: pattern.acc,
                    message: '格式有误',
                  },
                })}
              />
              <FieldValidateMessage error={errors.username} />
              <FormHelperText>须为7~13个英文或数字组合</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.password}>
              <FormLabel>密码</FormLabel>
              <Input
                name="password"
                bg="white"
                ref={register({
                  required: '不可为空',
                  pattern: {
                    value: pattern.pass,
                    message: '格式有误',
                  },
                })}
              />
              <FieldValidateMessage error={errors.password} />
              <FormHelperText>须为6~20个英文或数字组合</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.confirm_password}>
              <FormLabel>确认密码</FormLabel>
              <Input
                name="confirm_password"
                bg="white"
                ref={register({
                  required: '不可为空',
                  validate: (value) =>
                    value !== getValues('pass') ? '密码不同' : true,
                })}
              />
              <FieldValidateMessage error={errors.confirm_password} />
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
