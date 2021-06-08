import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { WithdrawCreateRequest } from '@/lib/types'
import useBankCardList from '@/service/useBankCardList'
import useCreateWithdraw from '@/service/useCreateWithdraw'
import useUserInfo from '@/service/useUserInfo'
import useWithdrawCount from '@/service/useWithdrawCount'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Divider, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type WithdrawFormProps = WithdrawCreateRequest
function withdrawForm() {
  const { handler: doCreateWithdraw, isLoading } = useCreateWithdraw()
  const { toCurrency } = useTransfer()
  const { bankcardList } = useBankCardList()
  const { userInfo } = useUserInfo()
  const { register, errors, handleSubmit } = useForm<WithdrawFormProps>()
  const { count } = useWithdrawCount()
  const router = useRouter()

  const onSubmit = handleSubmit(async (d) => {
    try {
      const orderId = await doCreateWithdraw({
        user_bank_id: d.user_bank_id,
        money: d.money,
        security_pwd: d.security_pwd,
      })
      if (orderId) {
        router.push(`/withdraw/success/${orderId}`)
      }
    } catch (err) {}
  })

  return (
    <Layout>
      <HeaderTitleBar back title="会员提款" />
      <Box flex="1" pb="55px">
        <Box
          color="#fff"
          bg="contentBg.500"
          lineHeight="50px"
          px="15px"
          mb="10px"
        >
          余额 /
          <Text
            ml="2"
            fontSize="2xl"
            as="span"
            color="brand.500"
            fontWeight="600"
          >
            $ {toCurrency(userInfo?.money)}
          </Text>
        </Box>
        <Stack
          as="form"
          px="15px"
          spacing="12px"
          onSubmit={onSubmit}
          noValidate
        >
          <FormControl className="formGroup" isInvalid={!!errors.user_bank_id}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              银行帐号
            </FormLabel>
            <Select
              name="user_bank_id"
              className="formSelect"
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
          <FormControl className="formGroup" isInvalid={!!errors.money}>
            <FormLabel color="#fff">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              提款金额
            </FormLabel>
            <Input
              name="money"
              placeholder="请输入提款金额"
              className="formInput"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.money} />
          </FormControl>
          <FormControl
            className="formGroup"
            isInvalid={!!errors.security_pwd}
            mb="20px"
          >
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              提领密码
            </FormLabel>
            <Input
              name="security_pwd"
              className="formInput"
              type="password"
              placeholder="请输入提领密码"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.security_pwd} />
          </FormControl>

          <Button
            type="submit"
            w="full"
            borderRadius="3px"
            colorScheme="brand"
            disabled={isLoading}
          >
            确认送出
            {isLoading && <Spinner ml="2" />}
          </Button>
          {count && (
            <Text color="red.500" fontSize="sm">
              本週免費提領剩餘次數：{count}次
            </Text>
          )}
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default withdrawForm
