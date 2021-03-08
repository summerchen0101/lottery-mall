import FieldValidateMessage from '@/components/FieldValidateMessage'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import UserBalance from '@/components/UserBalance'
import { useGlobalProvider } from '@/context/GlobalProvider'
import pattern from '@/lib/pattern'
import { OptionBasic } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type TransferForm = {
  acc: string
  amount: number
  sec_pass: string
}

const transfer: React.FC = () => {
  const router = useRouter()
  const API = useRequest()
  const toast = useToast()
  const { fetchUserInfo, fetchBankCardOpts } = useService()
  const { bankcardOpts, user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  const { register, handleSubmit, errors, reset } = useForm<TransferForm>()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.createTransfer({
        acc: d.acc,
        amount: +d.amount,
        sec_pass: d.sec_pass,
      })
      reset()
      fetchUserInfo()
      toast({
        status: 'success',
        title: '轉移成功',
      })
    } catch (err) {}
  })
  useEffect(() => {
    Promise.all([fetchBankCardOpts(), fetchUserInfo()])
  }, [])
  return (
    <Layout>
      <HeaderTitleBar
        back
        title="轉移"
        extra={
          <button
            className="s-btn"
            onClick={() => router.push('/transfer/record')}
          >
            轉移记录
          </button>
        }
      />
      <div className="main-content section-padding">
        <Box as="form" onSubmit={onSubmit} noValidate>
          <label className="form-label2">轉移對象</label>
          <div className="form-group">
            <input
              className="form-input w-100 mr-2"
              placeholder="請輸入帳號"
              name="acc"
              ref={register({ required: '不可為空' })}
            />
            <FieldValidateMessage error={errors.acc} />
          </div>
          <label className="form-label2">
            轉移金额
            <span className="user-wallet text-blue ml-3">
              餘額 ¥ {toCurrency(user?.balance, 2)}
            </span>
          </label>
          <div className="form-group">
            <input
              type="number"
              className="form-input w-100 mr-2"
              placeholder="請輸入提領金額"
              name="amount"
              ref={register({
                required: '不可為空',
                pattern: {
                  value: pattern.positiveInt,
                  message: '格式有誤',
                },
              })}
            />
            {/* <div className="btnbase primary_btn w-25 ft-15">最大额度</div> */}
            <FieldValidateMessage error={errors.amount} />
          </div>
          <label className="form-label2">
            轉移密码
            <span
              className="pointer label-right text-blue"
              onClick={() => router.push('/profile')}
            >
              前往设定
            </span>
          </label>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              name="sec_pass"
              placeholder="请输入轉移密码"
              ref={register({ required: '不可為空' })}
            />
            {/* <i className="iconfont iconeye-close btn_eye" /> */}
            <FieldValidateMessage error={errors.sec_pass} />
          </div>
          {/* <div className="d-flex ft-15 ">
              申请金额:<span className="text-blue mx-2">0</span>元
            </div> */}
          <button
            type="submit"
            className="btnbase primary_btn mt-4 mb-2"
            id="withdrawal_btn"
            data-toggle="modal"
            data-target="#withSuccessModal"
            // disabled
          >
            立即轉移
          </button>
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default transfer
