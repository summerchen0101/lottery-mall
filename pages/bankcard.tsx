import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box } from '@chakra-ui/layout'
import useRequest from '@/utils/useRequest'
import { MemberBank } from '@/lib/types'
import classNames from 'classnames'
import AlertPopup from '@/components/popups/AlertPopup'
import { useDisclosure } from '@chakra-ui/hooks'
import { useAlertProvider } from '@/context/AlertProvider'
import { useToast } from '@chakra-ui/toast'
import { useLoaderProvider } from '@/context/LoaderProvider'

const BankCardPage: React.FC = () => {
  const [memberBanks, setMemberBanks] = useState<MemberBank[]>([])
  const { onOpen, onClose } = useAlertProvider()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const router = useRouter()
  const API = useRequest()
  const toast = useToast()
  const fetchMemberBankList = async () => {
    loadingStart()
    try {
      const res = await API.getMemberBankList()
      setMemberBanks(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  const onRemoveConfirmed = async (id: number) => {
    try {
      await API.removeMemberBank(id)
      await fetchMemberBankList()
      onClose()
      toast({ status: 'success', title: '银行卡删除成功' })
    } catch (err) {}
  }
  const onSetDefault = async (id: number) => {
    try {
      await API.setDefaultMemberBank(id)
      await fetchMemberBankList()
    } catch (err) {}
  }
  useEffect(() => {
    fetchMemberBankList()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="银行卡帐户" />
      <div className="main-content section-padding">
        {/* 暂无数据 */}
        {/* <div class="data_null"><img src="/images/data_null.svg">
          <p>目前无设置账户</p>
          <button type="submit" class="btnbase primary_btn mt-4 mb-2" data-toggle="modal"
              data-target="#realnameModal">添加账户</button>
          <div class="ft-13 text-lighgray mt-3 text-left">注意：帐户最多只能设置5个，如需新增帐户请删减帐户后再进行添加</div>
      </div> */}
        <Box>
          <ul className="bank-list list-group">
            {memberBanks.map((t, i) => (
              <li
                key={i}
                className={classNames('bank-item', { check: !t.is_confirm })}
              >
                <div className="d-flex justify-content-between">
                  <div className="bank-name w-100">{t.name}</div>
                  <div className="user-name w-50 ">{t.person}</div>
                </div>
                <div className="bank-num">**** **** **** {t.acc.slice(-5)}</div>
                <div className="check-mask">审核中，请耐心等候</div>
                <div className="btn-wrap">
                  {t.is_confirm && (
                    <button
                      className={classNames(
                        'mr-1 w-50',
                        t.is_default ? 'primary_btn' : 'second_btn',
                      )}
                      onClick={() => onSetDefault(t.id)}
                    >
                      默认
                    </button>
                  )}

                  <button
                    className={classNames(
                      'second_btn',
                      t.is_confirm ? 'w-50' : 'w-100',
                    )}
                    onClick={() => onOpen(t.id)}
                  >
                    删除
                  </button>
                </div>
                <span className="focus">
                  <i className="iconcheck iconfont" />
                </span>
              </li>
            ))}
          </ul>
          <button
            hidden={memberBanks.length >= 5}
            type="button"
            className="btnbase primary_btn mt-2 mb-2"
            data-toggle="modal"
            onClick={() => router.push('/bankcard-add')}
          >
            添加帐户
          </button>
          <div className="ft-13 text-lighgray mt-3">
            注意：提款帐户最多只能绑定5个，如需绑定新帐户请删减旧帐户后再进行添加
          </div>
        </Box>
      </div>
      <AlertPopup onOk={onRemoveConfirmed} />
      <FooterNavBar />
    </Layout>
  )
}

export default BankCardPage
