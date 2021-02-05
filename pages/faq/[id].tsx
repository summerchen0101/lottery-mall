import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const faqDetail: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="帮助中心" />
      <div className="main-content section-padding">
        <div className="message-title w-100 my-3">如何儲值付款</div>
        <div className="message-time w-100">2020-09-07 02:48:36</div>
        <div className="message-content-col w-100 mt-4">
          1.在你申請微信支付前，請先用手機下載WeChat並註冊帳號
          <br />
          2.
          準備一張可供「實名認證」的信用卡或金融卡來進行綁定，目前微信支付在信用卡部分只支援VISA，而且並不是每間銀行的信用卡都可以；若是使用金融卡，則以郵局的金融卡最為方便。若使用台灣的信用卡綁定，只有1,000元人民幣的零用錢使用額度。
          <br />
          3.因為大部分的台灣用戶在帳號內並不會有錢包的功能，所以當你微信帳號註冊完成後，可從通訊錄內搜尋「錢包」並進入其頁面，選擇頁面右上角的「銀行卡」按鈕，再輸入卡片號碼、相關資訊並設定好付款密碼後即完成卡片綁定。有部分網友操作的方式則是，請已有微信支付功能的朋友先轉1元到你新開啟的帳號，當你完成收款後錢包功能就出現了。
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default faqDetail
