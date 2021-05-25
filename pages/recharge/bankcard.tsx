import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import bankCodes from '@/lib/bankCodes'
import { OfflinePayment } from '@/lib/enums'
import useOfflineBankcard from '@/service/useOfflineBankcard'
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
  const { bankcardList } = useOfflineBankcard(OfflinePayment.Bankcard)
  const info = useMemo(() => {
    if (watch('line_id')) {
      return bankcardList.find((t) => t.id === +watch('line_id'))
    }
  }, [watch('line_id')])
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await mutate({
        name: d.name,
        money: d.money,
        bank: d.bank,
        line_id: d.line_id,
        rate: d.rate,
      })
      // if (res.success) {
      //   router.push(`/withdraw/success/${res.data}`)
      // }
    } catch (err) {}
  })

  useEffect(() => {
    if (result?.success) {
      router.push(`/recharge/success/bankcard/${result.data}`)
    }
  }, [result])

  return (
    <Layout>
      <HeaderTitleBar back title={router.query.name} />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <Text color="purple.600" fontWeight="600" fontSize="lg" mb="1">
            余额： $ {toCurrency(userInfo?.money)}
          </Text>
          <FormControl isRequired isInvalid={!!errors.line_id}>
            <FormLabel>收款银行</FormLabel>
            <Select
              name="line_id"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {bankcardList?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.bank}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.line_id} />
            <FormHelperText>
              必須與您的銀行帳戶姓名一致，否则会导致无法到帐
            </FormHelperText>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.bank}>
            <FormLabel>转出银行</FormLabel>
            <Select
              name="bank"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {bankCodes?.map((t) => (
                <option key={t.code} value={`${t.name}(${t.code})`}>
                  {t.name}({t.code})
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.bank} />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>存款人姓名</FormLabel>
            <Input
              name="name"
              bg="white"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.name} />
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
                  message: `不可小于${info?.money_min}`,
                },
                max: {
                  value: info?.money_max,
                  message: `不可大于${info?.money_max}`,
                },
              })}
            />
            <FieldValidateMessage error={errors.money} />
            <FormHelperText>
              建议转账如500.77元或41667.8元等非整数金额，便于财务查收，加快到账速度
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
                單次存款限額：
                <Text as="span" fontWeight="bold">
                  {info.money_min}~{info.money_max}
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
