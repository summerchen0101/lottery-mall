import AgentPageTabs from '@/components/AgentPageTabs'
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
import { Text } from '@chakra-ui/react'

interface MemberFormProps {
  type: string
  username: string
  password: string
  confirm_password: string
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
    const res = await doCreateMember({
      type: +d.type,
      username: d.username,
      password: d.password,
      confirm_password: d.confirm_password,
      lottery_type_id: 1,
    })
    if (res.success) {
      alert.success('新增成功')
    }
    reset()
  })
  return (
    <Layout>
      <HeaderTitleBar back backPath="/agent" title="开户中心" />
      <AgentPageTabs />

      <Box className="layout" flex="1" overflowY="auto">
        <Box as="form" onSubmit={onSubmit} noValidate>
          <Stack spacing="12px">
            <FormControl className="formGroup" isInvalid={!!errors.type}>
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                注册类型
              </FormLabel>
              <RadioGroup
                name="type"
                colorScheme="brand"
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
            <FormControl className="formGroup" isInvalid={!!errors.username}>
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                会员帐号
              </FormLabel>
              <Input
                name="username"
                className="formInput"
                placeholder="请输入会员帐号"
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
            <FormControl className="formGroup" isInvalid={!!errors.password}>
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                密码
              </FormLabel>
              <Input
                name="password"
                type="password"
                className="formInput"
                placeholder="请输入密码"
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
            <FormControl
              className="formGroup"
              isInvalid={!!errors.confirm_password}
            >
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                确认密码
              </FormLabel>
              <Input
                name="confirm_password"
                type="password"
                className="formInput"
                placeholder="请输入密码"
                ref={register({
                  required: '不可为空',
                  validate: (value) =>
                    value !== getValues('password') ? '密码不同' : true,
                })}
              />
              <FieldValidateMessage error={errors.confirm_password} />
            </FormControl>
          </Stack>
          <Button
            type="submit"
            w="full"
            borderRadius="3px"
            colorScheme="red"
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
