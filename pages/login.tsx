import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import { LoginRequest } from '@/lib/types'
import useService from '@/utils/useService'
import useStorage from '@/utils/useStorage'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useForm } from 'react-hook-form'

type LoginFormProps = LoginRequest

const login = () => {
  const { register, errors, handleSubmit } = useForm<LoginFormProps>()
  const { useCaptcha, doLogin } = useService()
  const [, setToken] = useStorage('token')
  const router = useRouter()
  const { captcha, key } = useCaptcha()

  const onSubmit = handleSubmit(async (d) => {
    const res = await doLogin({ ...d, ckey: key })
    setToken(res?.token)
    router.push('/home')
  })
  return (
    <Layout>
      <Center h="100vh" bg="purple.600">
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
              />
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>验证码</FormLabel>
              <HStack>
                <Input
                  placeholder="验证码"
                  name="captcha"
                  ref={register({ required: '不可为空' })}
                />
                <Image h="34px" src={captcha} />
              </HStack>
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <Button
              mt={4}
              colorScheme="pink"
              w="full"
              // isLoading={props.isSubmitting}
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
