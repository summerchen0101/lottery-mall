import FieldValidateMessage from '@/components/FieldValidateMessage'
import Layout from '@/components/Layout'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormProps {
  acc: string
  pass: string
}

const IndexPage = () => {
  const { register, errors } = useForm<LoginFormProps>()

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
        >
          <Heading mb="30px" color="gray.600" align="center">
            LOGIN PAGE
          </Heading>
          <Stack spacing="20px">
            <FormControl isRequired>
              <FormLabel>帳號</FormLabel>
              <Input placeholder="帳號" ref={register({ required: true })} />
              <FieldValidateMessage error={errors.acc} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>密碼</FormLabel>
              <Input placeholder="密碼" ref={register({ required: true })} />
              <FieldValidateMessage error={errors.pass} />
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

export default IndexPage
