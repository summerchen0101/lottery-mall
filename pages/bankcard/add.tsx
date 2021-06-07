import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { BankCardCreateRequest } from '@/lib/types'
import useBankList from '@/service/useBankList'
import useCreateBankcard from '@/service/useCreateBankcard'
import useFirstBankName from '@/service/useFirstBankName'
import useAlert from '@/utils/useAlert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useForm } from 'react-hook-form'

type BankCardFormProps = BankCardCreateRequest
function bankAdd() {
  const router = useRouter()
  const alert = useAlert()
  const { handler: doCreateBankCard, isLoading } = useCreateBankcard()
  const { bankList } = useBankList()
  const { firstBankName } = useFirstBankName()
  const { register, errors, handleSubmit } = useForm<BankCardFormProps>()
  const onSubmit = handleSubmit(async (d) => {
    await doCreateBankCard({ ...d, name: firstBankName })
    await router.push('/bankcard')
    alert.success('新增成功')
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
              defaultValue={firstBankName}
              disabled={!!firstBankName}
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
              {bankList &&
                Object.entries(bankList).map(([id, name]) => (
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
          <Button
            type="submit"
            w="full"
            colorScheme="purple"
            disabled={isLoading}
          >
            确认送出
            {isLoading && <Spinner ml="2" />}
          </Button>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default bankAdd
