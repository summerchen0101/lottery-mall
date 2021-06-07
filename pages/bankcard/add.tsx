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
import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
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
    try {
      const res = await doCreateBankCard(d)
      if (res.success) {
        await router.push('/bankcard')
        alert.success('新增成功')
      }
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar back title="新增银行卡" />
      <Box flex="1" className="layout">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <FormControl className="formGroup" isInvalid={!!errors.name}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              银行卡姓名
            </FormLabel>
            <Input
              name="name"
              placeholder="请输入银行卡姓名"
              className="formInput"
              ref={register({ required: '不可为空' })}
              defaultValue={firstBankName}
              disabled={!!firstBankName}
            />
            <FieldValidateMessage error={errors.name} />
            <FormHelperText color="gray.400">
              必须与您的银行帐户姓名一致，否则无法进行取款
            </FormHelperText>
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.bank_id}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              银行名称
            </FormLabel>
            <Select
              className="formSelect"
              name="bank_id"
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
          <FormControl className="formGroup" isInvalid={!!errors.bank_name}>
            <Input
              className="formInput"
              placeholder="支行名称"
              name="bank_name"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.bank_name} />
            <FormHelperText color="gray.400">必须是您的开户支行</FormHelperText>
          </FormControl>
          <FormControl className="formGroup" isInvalid={!!errors.account}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              银行帐号
            </FormLabel>
            <Input
              className="formInput"
              name="account"
              placeholder="请输入银行帐号"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.account} />
            <FormHelperText color="gray.400">
              必须输入16~19个数字
            </FormHelperText>
          </FormControl>

          <SimpleGrid columns={2} spacingX="10px">
            <FormControl className="formGroup">
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                开户省份
              </FormLabel>
              <Input
                name="province"
                placeholder="请输入开户省份"
                className="formInput"
                ref={register}
              />
            </FormControl>
            <FormControl className="formGroup">
              <FormLabel color="#fff">
                {' '}
                <Text as="span" color="red.500">
                  *
                </Text>{' '}
                开户城市
              </FormLabel>
              <Input
                name="city"
                placeholder="请输入开户城市"
                className="formInput"
                ref={register}
              />
            </FormControl>
          </SimpleGrid>

          <Button
            type="submit"
            borderRadius="3px"
            w="full"
            colorScheme="red"
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
