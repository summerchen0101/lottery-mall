import FieldValidateMessage from '@/components/FieldValidateMessage'
import FloatNav from '@/components/FloatNav'
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
  FormControl,
  FormLabel,
  HStack,
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

type LoginFormProps = LoginRequest & {
  isRemAccPass: boolean
}

const login = () => {
  const { jsonEncode, jsonDecode, openServiceWin } = useHelper()
  const [encodeAccPass, setEncodeAccPass] = useStorage(
    'encodeAccPass',
    '',
    'local',
  )
  const decodeAccPass = useMemo(
    () => jsonDecode<{ acc: string; pass: string }>(encodeAccPass),
    [encodeAccPass],
  )
  const { register, errors, handleSubmit, setValue } = useForm<LoginFormProps>()
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
      router.push({
        pathname: (router.query.to as string) || '/lottery',
        query: { n: 1 },
      })
    } else {
      refresh()
      setValue('captcha', '')
    }
  })

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
              <FormLabel>* ????????????</FormLabel>
              <Input
                className="formInput"
                placeholder="?????????????????????"
                name="username"
                ref={register({ required: '????????????' })}
                defaultValue={decodeAccPass?.acc}
              />
              <FieldValidateMessage error={errors.username} />
            </FormControl>
            <FormControl className="formGroup">
              <FormLabel>* ??????</FormLabel>
              <Input
                className="formInput"
                placeholder="?????????????????????"
                name="password"
                type="password"
                ref={register({ required: '????????????' })}
                defaultValue={decodeAccPass?.pass}
              />
              <FieldValidateMessage error={errors.password} />
            </FormControl>
            <FormControl className="formGroup">
              <FormLabel>* ?????????</FormLabel>
              <HStack>
                <Input
                  placeholder="?????????"
                  className="formInput"
                  name="captcha"
                  ref={register({
                    required: '????????????',
                    pattern: { value: /^\w{5}$/, message: '????????????' },
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
              <Text>????????????</Text>
            </HStack>

            <Button
              height="45px"
              borderRadius="22.5px"
              colorScheme="brand"
              w="full"
              isLoading={isLoading}
              type="submit"
            >
              ??????
            </Button>
            <VStack pt=".5rem">
              <Text>
                ???????????? GEM100
                <Box
                  ml="1"
                  as="span"
                  cursor="pointer"
                  color="#fff"
                  onClick={() => router.push('/register')}
                >
                  ????????????
                </Box>
              </Text>
              <Text
                cursor="pointer"
                color="#fff"
                onClick={() => openServiceWin(serviceLink)}
              >
                ????????????
              </Text>
            </VStack>
          </Stack>
        </Box>
      </VStack>
      <FloatNav showAppBtn />
    </Layout>
  )
}

export default login
