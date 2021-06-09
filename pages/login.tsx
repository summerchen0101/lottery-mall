import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { LoginRequest } from '@/lib/types'
import useCaptcha from '@/service/useCaptcha'
import useLogin from '@/service/useLogin'
import useServiceLink from '@/service/useServiceLink'
import useHelper from '@/utils/useHelper'
import useStorage from '@/utils/useStorage'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { BiMobile, BiPhone, BiUser, BiUserCircle } from 'react-icons/bi'

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
  const { serviceLink } = useServiceLink()
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

  const handleServiceClicked = () => {
    router.push({
      pathname: '/service',
      query: {
        service: serviceLink
          .replace('{memberName}', '')
          .replace('{memberId}', ''),
      },
    })
  }

  return (
    <Layout>
      <VStack h="100%" bg="containerBg.500">
        <Image
          m="40px auto 1rem auto"
          w="35vw"
          h="auto"
          src="./img/logo.png"
        ></Image>
        <Box
          as="form"
          // pb="60px"
          // pt="40px"
          px="1rem"
          w="full"
          borderRadius="lg"
          onSubmit={onSubmit}
          noValidate
        >
          <Stack spacing=".5rem">
            <FormControl className="formGroup">
              <FormLabel>* 会员账号</FormLabel>
              <Input
                className="formInput"
                placeholder="请输入会员账号"
                name="username"
                ref={register({ required: '不可为空' })}
                defaultValue={decodeAccPass?.acc}
              />
              <FieldValidateMessage error={errors.username} />
            </FormControl>
            <FormControl className="formGroup">
              <FormLabel>* 密码</FormLabel>
              <Input
                className="formInput"
                placeholder="请输入会员密码"
                name="password"
                type="password"
                ref={register({ required: '不可为空' })}
                defaultValue={decodeAccPass?.pass}
              />
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <FormControl className="formGroup">
              <FormLabel>* 验证码</FormLabel>
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
                    <Spinner size="md" color="rgba(0,0,0,0.3)" />
                  ) : (
                    <Image h="full" src={captcha} onClick={() => refresh()} />
                  )}
                </Center>
              </HStack>
              <FieldValidateMessage error={errors.captcha} />
            </FormControl>
            <HStack mb="2rem">
              <Checkbox
                colorScheme="brand"
                name="isRemAccPass"
                ref={register}
                defaultChecked
              />
              <Text>记住帐密</Text>
            </HStack>

            <Button
              height="45px"
              borderRadius="22.5px"
              colorScheme="brand"
              w="full"
              isLoading={isLoading}
              type="submit"
            >
              送出
            </Button>
            <VStack pt=".5rem">
              <Text>
                立即加入 GEM100
                <Box
                  ml="1"
                  as="span"
                  cursor="pointer"
                  color="#fff"
                  onClick={() => router.push('/register')}
                >
                  免费注册
                </Box>
              </Text>
              <Text
                cursor="pointer"
                color="#fff"
                onClick={handleServiceClicked}
              >
                联系客服
              </Text>
            </VStack>
          </Stack>
        </Box>
      </VStack>
      <VStack position="fixed" right="20px" bottom="50px" spacing="3">
        <IconButton
          borderRadius="full"
          aria-label="app"
          as={BiMobile}
          color="white"
          bg="gray.500"
          boxSize="50px"
          p="2"
          onClick={() => router.push('/app-download')}
        />
        <IconButton
          borderRadius="full"
          aria-label="service"
          as={BiUser}
          color="white"
          bg="gray.500"
          boxSize="50px"
          p="2"
          onClick={handleServiceClicked}
        />
      </VStack>
    </Layout>
  )
}

export default login
