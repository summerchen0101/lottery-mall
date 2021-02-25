import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/dist/client/router'
import QRCode from 'qrcode'
import React, { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const invite: React.FC = () => {
  const [qrcode, setQrcode] = useState('')
  const { user } = useGlobalProvider()
  const router = useRouter()
  const { fetchUserInfo } = useService()
  const promoLink = useRef('')
  const toast = useToast()

  if (process.browser) {
    promoLink.current = `${location.origin}/p/${user?.promo_code}`
  }

  const createQrcode = async () => {
    const dataString = await QRCode.toDataURL(promoLink.current)
    setQrcode(dataString)
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])
  useEffect(() => {
    if (user) createQrcode()
  }, [user])
  return (
    <Layout>
      <HeaderTitleBar back title="会员推广" />
      <div className="main-content section-padding agent-section">
        <div className="qr-code-box">
          <img src={qrcode} />
        </div>
        <label className="form-label2">推广连结</label>
        <div className="form-group">
          <div className="form-copy">{promoLink.current}</div>
          <CopyToClipboard
            text={promoLink.current}
            onCopy={() => toast({ status: 'success', title: '已複製至剪貼簿' })}
          >
            <i className="iconcopy iconfont btn_copy" />
          </CopyToClipboard>
        </div>
        <label className="form-label2">推广代码</label>
        <div className="form-group">
          <div className="form-copy">{user?.promo_code}</div>
          <CopyToClipboard
            text={user?.promo_code}
            onCopy={() => toast({ status: 'success', title: '已複製至剪貼簿' })}
          >
            <i className="iconcopy iconfont btn_copy" />
          </CopyToClipboard>
        </div>
        <button
          type="submit"
          className="btnbase primary_btn mt-4 mb-2 "
          onClick={() => router.push('/invite-profit')}
        >
          推广收益
        </button>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default invite
