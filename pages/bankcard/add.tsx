import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { BankCard, BankCardCreateRequest } from '@/lib/types'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'

type BankCardFormProps = BankCardCreateRequest
function bankAdd() {
  const { useFirstBankName, useBankList, doCreateBankCard } = useService()
  const { data: bankRes } = useBankList()
  const { data: NameRes } = useFirstBankName()
  const { register, errors, handleSubmit } = useForm<BankCardFormProps>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await doCreateBankCard({ ...d, name: NameRes?.data.name })
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar back title="新增银行卡" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>银行卡姓名</FormLabel>
            <Input
              name="name"
              bg="white"
              ref={register({ required: '不可为空' })}
              defaultValue={NameRes?.data.name}
              disabled={!!NameRes?.data.name}
            />
            <FieldValidateMessage error={errors.name} />
            <FormHelperText>
              必须与您的银行帐户姓名一致，否则无法进行取款
            </FormHelperText>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.bank_id}>
            <FormLabel>银行名称</FormLabel>
            <Select
              name="bank_id"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {bankRes &&
                Object.entries(bankRes.list).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Select>
            <FieldValidateMessage error={errors.bank_id} />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.bank_name}>
            <FormLabel>支行名称</FormLabel>
            <Input
              name="bank_name"
              bg="white"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.bank_name} />
            <FormHelperText>必须是您的开户支行</FormHelperText>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.account}>
            <FormLabel>银行帐号</FormLabel>
            <Input
              name="account"
              bg="white"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.account} />
            <FormHelperText>必须输入16~19个数字</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>开户省份</FormLabel>
            <Input name="province" bg="white" ref={register} />
          </FormControl>
          <FormControl>
            <FormLabel>开户城市</FormLabel>
            <Input name="city" bg="white" ref={register} />
          </FormControl>
          <Button type="submit" w="full" colorScheme="purple">
            确认送出
          </Button>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default bankAdd
