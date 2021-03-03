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

type WithdrawForm = {
  bank_id: number
  amount: number
  sec_pass: string
}

const withdraw: React.FC = () => {
  const router = useRouter()
  const API = useRequest()
  const toast = useToast()
  const { fetchUserInfo, fetchBankCardOpts } = useService()
  const { bankcardOpts, user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  const { register, handleSubmit, errors, reset } = useForm<WithdrawForm>()

  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.createWithdraw({
        bank_id: +d.bank_id,
        amount: +d.amount,
        sec_pass: d.sec_pass,
      })
      reset()
      fetchUserInfo()
      toast({
        status: 'success',
        title: '提领',
        description: '提领申请已送出，将尽快为您处理！',
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
        title="提领"
        extra={
          <button
            className="s-btn"
            onClick={() => router.push('/withdraw/record')}
          >
            提领记录
          </button>
        }
      />
      {/* <div className="pintop-section fixed">
        <ul className="acc-inner mt-1 px-2">
          <li className="acc-item">
            <p className="user-wallet">20,849.55</p>
            <span>可用余额</span>
          </li>
          <li className="divider" />
          <li className="acc-item">
            <p>1,849.55</p>
            <span>交易中金额</span>
          </li>
        </ul>
      </div> */}
      <div className="main-content section-padding">
        <Box as="form" onSubmit={onSubmit} noValidate>
          <label className="form-label2">
            选择取款账户
            <span
              className="label-right text-blue"
              onClick={() => router.push('/bankcard')}
            >
              账户设置
            </span>
          </label>
          {/* <div class="btnbase outline_btn color-blue" onclick="location.href = 'bankcard-add.html'">
  添加帐户
</div> */}
          <div className="form-group">
            <Select
              placeholder="选择银行卡"
              name="bank_id"
              ref={register({ required: '不可為空' })}
            >
              {bankcardOpts.map((t, i) => (
                <option key={i} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <FieldValidateMessage error={errors.bank_id} />
          </div>
          <label className="form-label2">
            提领金额
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
            提领密码
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
              placeholder="请输入提领密码"
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
            立即提领
          </button>
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default withdraw
