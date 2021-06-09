import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import pattern from '@/lib/pattern'
import useBankList from '@/service/useBankList'
import useCaptcha from '@/service/useCaptcha'
import useCreateBankcard from '@/service/useCreateBankcard'
import useFirstBankName from '@/service/useFirstBankName'
import useRegister from '@/service/useRegister'
import useAlert from '@/utils/useAlert'
import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Center, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'

interface RegisterForm {
  invite: string
  username: string
  password: string
  confirm_password: string
  ckey: string
  captcha: string
  isAgree: boolean
}

function register() {
  const router = useRouter()
  const alert = useAlert()
  const { handler: doRegister, isLoading } = useRegister()
  const { captcha, key, isLoading: isCaptchaLoading, refresh } = useCaptcha()
  const { register, errors, handleSubmit } = useForm<RegisterForm>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await doRegister({
        invite: d.invite,
        username: d.username,
        password: d.password,
        confirm_password: d.confirm_password,
        ckey: key,
        captcha: d.captcha,
      })
      if (res.success) {
        await router.push('/login')
        alert.success('注册成功')
      }
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar
        title="注册"
        extra={
          <Icon
            as={BiX}
            fontSize="30px"
            onClick={() => router.push('/login')}
          />
        }
      />
      <Box flex="1" p="15px" as="form" onSubmit={onSubmit} noValidate>
        <Stack spacing="12px">
          <FormControl className="formGroup" isInvalid={!!errors.invite}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              邀请码
            </FormLabel>
            <Input
              name="invite"
              placeholder="请输入邀请码"
              className="formInput"
              ref={register({ required: '不可为空' })}
              defaultValue={router.query?.code?.[0]}
            />
            <FieldValidateMessage error={errors.invite} />
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.username}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              会员帐号
            </FormLabel>
            <Input
              className="formInput"
              placeholder="请输入会员帐号"
              name="username"
              ref={register({
                required: '不可为空',
                pattern: {
                  value: pattern.acc,
                  message: '格式有误',
                },
              })}
            />
            <FieldValidateMessage error={errors.username} />
            <FormHelperText color="yellow.500" fontSize="sm">
              须为7~13个英文或数字组合
            </FormHelperText>
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.password}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              密码
            </FormLabel>
            <Input
              placeholder="请输入密码"
              className="formInput"
              type="password"
              name="password"
              ref={register({
                required: '不可为空',
                pattern: {
                  value: pattern.pass,
                  message: '格式有误',
                },
              })}
            />
            <FieldValidateMessage error={errors.password} />
            <FormHelperText color="yellow.500">
              须为6~20个英文与数字组合
            </FormHelperText>
          </FormControl>
          <FormControl
            className="formGroup"
            isInvalid={!!errors.confirm_password}
          >
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              确认密码
            </FormLabel>
            <Input
              placeholder="请输入密码"
              className="formInput"
              type="password"
              name="confirm_password"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.confirm_password} />
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.captcha}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              验证码
            </FormLabel>
            <HStack>
              <Input
                placeholder="验证码"
                className="formInput"
                name="captcha"
                ref={register({
                  required: '不可为空',
                  pattern: { value: /^\w{5}$/, message: '格式有误' },
                })}
              />
              <Center h="34px" w="120px">
                {isCaptchaLoading ? (
                  <Spinner size="md" color="gray.400" />
                ) : (
                  <Image h="full" src={captcha} onClick={() => refresh()} />
                )}
              </Center>
            </HStack>
            <FieldValidateMessage error={errors.captcha} />
          </FormControl>
          <FormControl isInvalid={!!errors.isAgree}>
            <HStack as="label">
              <Checkbox
                size="sm"
                name="isAgree"
                colorScheme="brand"
                ref={register({ required: '需勾选确认' })}
              />
              <Text fontSize="sm" color="gray.100">
                已满成年且同意平台规范进行操作与各项
                <Text as="span" color="orange.500" ml="1">
                  用户协议
                </Text>
              </Text>
            </HStack>
            <FieldValidateMessage error={errors.isAgree} />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          borderRadius="3px"
          w="full"
          colorScheme="red"
          disabled={isLoading}
          mt="20px"
        >
          确认送出
          {isLoading && <Spinner ml="2" />}
        </Button>
      </Box>
    </Layout>
  )
}

export default register
