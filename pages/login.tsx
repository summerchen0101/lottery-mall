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
    setToken(res.token)
    router.push('/home')
  })
  return (
    <Layout>
      <Center h="100vh" bg="pink.200">
        <Box
          as="form"
          pb="60px"
          bg="white"
          py="40px"
          px="50px"
          shadow="md"
          w="full"
          onSubmit={onSubmit}
        >
          <Heading mb="30px" color="gray.600" align="center">
            LOGIN PAGE
          </Heading>
          <Stack spacing="20px">
            <FormControl isRequired>
              <FormLabel>帳號</FormLabel>
              <Input
                placeholder="帳號"
                name="username"
                ref={register({ required: '不可为空' })}
              />
              <FieldValidateMessage error={errors.username} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>密碼</FormLabel>
              <Input
                placeholder="密碼"
                name="password"
                ref={register({ required: '不可为空' })}
              />
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>驗證碼</FormLabel>
              <HStack>
                <Input
                  placeholder="驗證碼"
                  name="captcha"
                  ref={register({ required: '不可为空' })}
                />
                <Image src={captcha} />
              </HStack>
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <Button
              mt={4}
              colorScheme="gray"
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
