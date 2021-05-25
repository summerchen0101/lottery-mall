import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { WithdrawCreateRequest } from '@/lib/types'
import useBankCardList from '@/service/useBankCardList'
import useUserInfo from '@/service/useUserInfo'
import useWithdrawCount from '@/service/useWithdrawCount'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Divider, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useForm } from 'react-hook-form'

type WithdrawFormProps = WithdrawCreateRequest
function withdrawForm() {
  const { doCreateWithdraw } = useService()
  const { toCurrency } = useTransfer()
  const { bankcardList } = useBankCardList()
  const { userInfo } = useUserInfo()
  const { register, errors, handleSubmit } = useForm<WithdrawFormProps>()
  const { count } = useWithdrawCount()
  const router = useRouter()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await doCreateWithdraw({
        user_bank_id: d.user_bank_id,
        money: d.money,
        security_pwd: d.security_pwd,
      })
      if (res.success) {
        router.push(`/withdraw/success/${res.data}`)
      }
    } catch (err) {}
  })
  return (
    <Layout>
      <HeaderTitleBar back title="会员提款" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <Text color="purple.600" fontWeight="600" fontSize="lg" mb="1">
            余额： $ {toCurrency(userInfo?.money)}
          </Text>
          <FormControl isRequired isInvalid={!!errors.user_bank_id}>
            <FormLabel>银行帐号</FormLabel>
            <Select
              name="user_bank_id"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {bankcardList?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.bank} (***{t.account.substr(-5)})
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.user_bank_id} />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.money}>
            <FormLabel>提款金额</FormLabel>
            <Input
              name="money"
              bg="white"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.money} />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.security_pwd}>
            <FormLabel>提领密码</FormLabel>
            <Input
              name="security_pwd"
              bg="white"
              type="password"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.security_pwd} />
          </FormControl>
          <Divider h="2" />
          <Button type="submit" w="full" colorScheme="purple">
            确认送出
          </Button>
          {count && (
            <Text color="red.500" fontWeight="600">
              ★ 本週免費提領剩餘次數：{count}次
            </Text>
          )}
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default withdrawForm
