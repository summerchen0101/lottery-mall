import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { PasswordType } from '@/lib/enums'
import { passTypeOpts } from '@/lib/options'
import useUserInfo from '@/service/useUserInfo'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface PasswordForm {
  pwd: string
  new_pwd: string
  new_pwd_confirm: string
}

function pass() {
  const router = useRouter()
  const passType = useMemo(
    () => (+router.query.type as unknown) as PasswordType,
    [router],
  )
  const { toOptionName } = useTransfer()
  const toast = useToast()
  const { doEditPass } = useService()
  const {
    register,
    errors,
    handleSubmit,
    reset,
    getValues,
  } = useForm<PasswordForm>()

  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await doEditPass({
        type: passType,
        pwd: d.pwd,
        new_pwd: d.new_pwd,
        c_new_pwd: d.new_pwd_confirm,
      })
      if (res.success) {
        toast({
          status: 'success',
          title: `${toOptionName(passTypeOpts, passType)}修改成功`,
        })
        reset()
      }
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar back title={toOptionName(passTypeOpts, passType)} />
      <Box flex="1" className="layout">
        <Text color="#fff" fontSize="md" mb="3">
          您可以在下方修改您的密码, 或直接联系我们的线上客服
        </Text>
        <Stack
          as="form"
          spacing="12px"
          noValidate
          onReset={() => reset()}
          onSubmit={onSubmit}
        >
          <FormControl className="formGroup" isInvalid={!!errors.pwd}>
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              原密码
            </FormLabel>
            <Input
              name="pwd"
              type="password"
              placeholder="请输入原密码"
              className="formInput"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.pwd} />
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.new_pwd}>
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              新密码
            </FormLabel>
            <Input
              name="new_pwd"
              type="password"
              placeholder="请输入新密码"
              className="formInput"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.new_pwd} />
          </FormControl>
          <FormControl
            className="formGroup"
            isInvalid={!!errors.new_pwd_confirm}
            mb="5"
          >
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              确认新密码
            </FormLabel>
            <Input
              placeholder="请输入新密码"
              name="new_pwd_confirm"
              type="password"
              className="formInput"
              ref={register({
                required: '不可为空',
                validate: (value) =>
                  value !== getValues('new_pwd') ? '密码不同' : true,
              })}
            />
            <FieldValidateMessage error={errors.new_pwd_confirm} />
          </FormControl>

          <HStack>
            <Button
              colorScheme="gray"
              borderRadius="3px"
              bg="transparent"
              border="1px"
              w="full"
              onClick={() => router.back()}
            >
              取消
            </Button>
            {/* <Button
              colorScheme="gray"
              bg="gray.300"
              size="lg"
              w="full"
              type="reset"
            >
              重置
            </Button> */}
            <Button colorScheme="red" borderRadius="3px" w="full" type="submit">
              确认送出
            </Button>
          </HStack>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default pass
