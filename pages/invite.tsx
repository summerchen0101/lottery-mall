import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const invite: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="会员推广" />
      <div className="main-content section-padding agent-section">
        <div className="qr-code-box">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/QRcode_image.svg" />
        </div>
        <label className="form-label2">推广连结</label>
        <div className="form-group">
          <div className="form-copy">ag88.com/akb48</div>
          <i className="iconcopy iconfont btn_copy" />
        </div>
        <label className="form-label2">推广代码</label>
        <div className="form-group">
          <div className="form-copy">akb48</div>
          <i className="iconcopy iconfont btn_copy" />
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
