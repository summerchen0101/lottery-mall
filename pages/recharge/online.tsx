import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useOnlineRecharge, {
  OnlineRechargeReq,
} from '@/service/useOnlineRecharge'
import usePaymentBranchList from '@/service/usePaymentBranchList'
import usePaymentChannelList from '@/service/usePaymentChannelList'
import useUserInfo from '@/service/useUserInfo'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type RechargeFormProps = OnlineRechargeReq
function rechargeForm() {
  const { mutate, isLoading, result } = useOnlineRecharge()
  const { toCurrency } = useTransfer()
  const { userInfo } = useUserInfo()
  const {
    register,
    errors,
    handleSubmit,
    watch,
    setValue,
  } = useForm<RechargeFormProps>()
  const router = useRouter()
  const { paymentBranchs } = usePaymentBranchList(+router.query.id)
  const { paymentChannels } = usePaymentChannelList(watch('payments_branch_id'))
  const info = useMemo(() => {
    if (watch('interface')) {
      return paymentChannels.find((t) => t.interface === +watch('interface'))
    }
  }, [watch('interface')])
  const onSubmit = handleSubmit(async (d) => {
    try {
      await mutate({
        money: d.money,
        interface: +d.interface,
        payments_branch_id: +d.payments_branch_id,
      })
    } catch (err) {}
  })
  useEffect(() => {
    if (result?.success && result?.data.dataType === 1) {
      location.href = result.data.url
    }
  }, [result])

  useEffect(() => {
    setValue('payments_branch_id', paymentBranchs?.[0]?.id || '')
  }, [paymentBranchs])

  useEffect(() => {
    setValue('interface', paymentChannels?.[0]?.interface || '')
  }, [paymentChannels])

  return (
    <Layout>
      <HeaderTitleBar back title={`${router.query.name}充值`} />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          {/* <Text color="purple.600" fontWeight="600" fontSize="lg" mb="1">
            余额： $ {toCurrency(userInfo?.money)}
          </Text> */}
          <FormControl
            className="formGroup"
            isInvalid={!!errors.payments_branch_id}
          >
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>
              存款媒介
            </FormLabel>
            <Select
              name="payments_branch_id"
              className="formSelect"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {paymentBranchs?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.payments_branch_id} />
          </FormControl>

          <FormControl className="formGroup" isInvalid={!!errors.interface}>
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>
              支付通道
            </FormLabel>
            <Select
              name="interface"
              className="formSelect"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {paymentChannels?.map((t) => (
                <option key={t.id} value={t.interface}>
                  {t.name}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.interface} />
          </FormControl>

          <FormControl className="formGroup" isInvalid={!!errors.money}>
            <FormLabel color="#fff">
              {' '}
              <Text as="span" color="red.500">
                *
              </Text>
              存款金额
            </FormLabel>
            <Input
              name="money"
              placeholder="请输入存款金额"
              className="formInput"
              type="number"
              ref={register({
                required: '不可为空',
                min: {
                  value: info?.money_min,
                  message: `不可小于${toCurrency(info?.money_min, 0)}`,
                },
                max: {
                  value: info?.money_max,
                  message: `不可大于${toCurrency(info?.money_max, 0)}`,
                },
              })}
            />
            <FieldValidateMessage error={errors.money} />
          </FormControl>

          {info && (
            <Stack
              p="3"
              borderRadius="3px"
              bg="red.600"
              color="white"
              spacing={1}
            >
              <Text>
                单次存款限额：
                <Text as="span" fontWeight="bold">
                  {toCurrency(info.money_min, 0)}~
                  {toCurrency(info.money_max, 0)}
                </Text>
              </Text>
              <Text>
                单日存款限额：
                <Text as="span" fontWeight="bold">
                  {toCurrency(info.day_limit, 0)}
                </Text>
              </Text>
            </Stack>
          )}

          <Button
            type="submit"
            w="full"
            borderRadius="3px"
            colorScheme="brand"
            isLoading={isLoading}
          >
            确认送出
          </Button>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeForm
