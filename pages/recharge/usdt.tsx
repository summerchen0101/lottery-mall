import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import bankCodes from '@/lib/bankCodes'
import { OfflinePayment } from '@/lib/enums'
import useOfflinePayment from '@/service/useOfflinePayment'
import useSiteParams from '@/service/useSiteParams'
import useOfflineRecharge, {
  OfflineRechargeReq,
} from '@/service/useOfflineRecharge'
import useUserInfo from '@/service/useUserInfo'
import useTransfer from '@/utils/useTransfer'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Divider, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type RechargeFormProps = OfflineRechargeReq
function rechargeForm() {
  const { mutate, result, isLoading } = useOfflineRecharge()
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
  const { rate } = useSiteParams()
  const { paymentList } = useOfflinePayment(OfflinePayment.USDT)
  const info = useMemo(() => {
    if (watch('line_id')) {
      return paymentList.find((t) => t.id === +watch('line_id'))
    }
  }, [watch('line_id')])
  const onSubmit = handleSubmit(async (d) => {
    try {
      await mutate({
        name: d.name,
        money: d.money,
        bank: d.bank,
        line_id: d.line_id,
        rate: d.rate,
      })
    } catch (err) {}
  })

  useEffect(() => {
    rate && setValue('rate', rate)
  }, [rate])

  useEffect(() => {
    if (result?.success) {
      router.push(`/recharge/success/usdt/${result.data}`)
    }
  }, [result])

  return (
    <Layout>
      <HeaderTitleBar back title="USDT转帐充值" />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <Text color="purple.600" fontWeight="600" fontSize="lg" mb="1">
            余额： $ {toCurrency(userInfo?.money)}
          </Text>
          <FormControl isRequired isInvalid={!!errors.line_id}>
            <FormLabel>鏈名稱</FormLabel>
            <Select
              name="line_id"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {paymentList?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.line_id} />
            <FormHelperText>
              必须与您的银行帐户姓名一致，否则会导致无法到帐
            </FormHelperText>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.money}>
            <FormLabel>存款金额</FormLabel>
            <Input
              name="money"
              type="number"
              bg="white"
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
            <FormHelperText>
              当前汇率: {rate} USDT/CNY (汇率实时波动，仅供参考)
            </FormHelperText>
          </FormControl>
          {info && (
            <Stack
              p="3"
              borderRadius="md"
              bg="pink.600"
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
            </Stack>
          )}
          <Divider h="2" />
          <Button
            type="submit"
            w="full"
            colorScheme="purple"
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
