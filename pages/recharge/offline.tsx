import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { WithdrawCreateRequest } from '@/lib/types'
import useBankCardList from '@/service/useBankCardList'
import usePaymentBranchList from '@/service/usePaymentBranchList'
import usePaymentChannelList from '@/service/usePaymentChannelList'
import useRecharge, { RechargeReq } from '@/service/useRecharge'
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

type RechargeFormProps = RechargeReq
function rechargeForm() {
  const { mutate } = useRecharge()
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

  return (
    <Layout>
      <HeaderTitleBar back title={router.query.name} />
      <Box flex="1" overflowY="auto" p="20px" pb="50px">
        <Stack as="form" spacing="12px" onSubmit={onSubmit} noValidate>
          <Text color="purple.600" fontWeight="600" fontSize="lg" mb="1">
            余额： $ {toCurrency(userInfo?.money)}
          </Text>
          <FormControl isRequired isInvalid={!!errors.user_bank_id}>
            <FormLabel>存款媒介</FormLabel>
            <Select
              name="payments_branch_id"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
              // onChange={(e) => setValue('')}
            >
              {paymentBranchs?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.user_bank_id} />
          </FormControl>
          <FormControl>
            <FormLabel>存款金额</FormLabel>
            <Input
              name="money"
              bg="white"
              ref={register({ required: '不可为空' })}
            />
            <FieldValidateMessage error={errors.money} />
          </FormControl>
          <FormControl>
            <FormLabel>支付通道</FormLabel>
            <Select
              name="interface"
              bg="white"
              ref={register({ required: '不可为空' })}
              placeholder="请选择"
            >
              {paymentChannels?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Divider h="2" />
          <Button type="submit" w="full" colorScheme="purple">
            确认送出
          </Button>
        </Stack>
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default rechargeForm
