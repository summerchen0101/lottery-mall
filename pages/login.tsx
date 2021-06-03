import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { LoginRequest } from '@/lib/types'
import useCaptcha from '@/service/useCaptcha'
import useLogin from '@/service/useLogin'
import useHelper from '@/utils/useHelper'
import useStorage from '@/utils/useStorage'
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

type LoginFormProps = LoginRequest & {
  isRemAccPass: boolean
}

const login = () => {
  const { jsonEncode, jsonDecode } = useHelper()
  const [encodeAccPass, setEncodeAccPass] = useStorage(
    'encodeAccPass',
    '',
    'local',
  )
  const decodeAccPass = useMemo(
    () => jsonDecode<{ acc: string; pass: string }>(encodeAccPass),
    [encodeAccPass],
  )
  const { register, errors, handleSubmit } = useForm<LoginFormProps>()
  const { handler: doLogin, isLoading } = useLogin()
  const { setToken } = useGlobalProvider()
  const router = useRouter()
  const { captcha, key, isLoading: isCaptchaLoading, refresh } = useCaptcha()

  const onSubmit = handleSubmit(async (d) => {
    d.isRemAccPass
      ? setEncodeAccPass(jsonEncode({ acc: d.username, pass: d.password }))
      : setEncodeAccPass('')
    const res = await doLogin({ ...d, ckey: key })
    if (res?.success) {
      setToken(res?.token)
      router.push({ pathname: '/home', query: { n: 1 } })
    }
  })

  return (
    <Layout>
      <Center h="100%" bg="purple.600">
        <Box
          as="form"
          pb="60px"
          bg="white"
          py="40px"
          px="50px"
          shadow="lg"
          mx="20px"
          w="full"
          borderRadius="lg"
          onSubmit={onSubmit}
          noValidate
        >
          <Heading mb="30px" color="gray.600" align="center">
            99购商城
          </Heading>
          <Stack spacing="20px">
            <FormControl isRequired>
              <FormLabel>帐号</FormLabel>
              <Input
                placeholder="帐号"
                name="username"
                ref={register({ required: '不可为空' })}
                defaultValue={decodeAccPass?.acc}
              />
              <FieldValidateMessage error={errors.username} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>密码</FormLabel>
              <Input
                placeholder="密码"
                name="password"
                type="password"
                ref={register({ required: '不可为空' })}
                defaultValue={decodeAccPass?.pass}
              />
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>验证码</FormLabel>
              <HStack>
                <Input
                  placeholder="验证码"
                  name="captcha"
                  ref={register({
                    required: '不可为空',
                    pattern: { value: /^\w{5}$/, message: '格式有误' },
                  })}
                />
                <Center h="34px" w="120px">
                  {isCaptchaLoading ? (
                    <Spinner size="md" color="rgba(0,0,0,0.3)" />
                  ) : (
                    <Image h="full" src={captcha} onClick={() => refresh()} />
                  )}
                </Center>
              </HStack>
              <FieldValidateMessage error={errors.captcha} />
            </FormControl>
            <HStack>
              <Checkbox name="isRemAccPass" ref={register} defaultChecked />
              <Text>记住帐密</Text>
            </HStack>

            <Button
              mt={4}
              colorScheme="pink"
              w="full"
              isLoading={isLoading}
              type="submit"
            >
              送出
            </Button>
          </Stack>
        </Box>
      </Center>
    </Layout>
  )
}

export default login
