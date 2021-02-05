import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import React from 'react'

const agentJoin: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="合營計畫" />
      <div className="main-content section-padding agent-section">
        <p className="text-gray ft-14 my-2 lh-16">
          歡迎加入代理聯盟品牌熱度十足，代理可坐享廣告品牌效應。市場策略為業界最佳，口碑也是我們最好的營銷方式。團隊竭誠為您服務！提供多種溝通管道(QQ、微信、Mail)，期待為您服務！
        </p>
        <label className="form-label2">姓名</label>
        <div className="form-group">
          <input type="text" className="form-input" placeholder="请输入姓名" />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <label className="form-label2">QQ</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="请输入请输入QQ账号"
          />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <label className="form-label2">微信</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="请输入微信账号"
          />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <label className="form-label2">邮箱账号</label>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="请输入邮箱账号"
          />
          <a className="iconfont iconclear btn_cancel"></a>
        </div>
        <button type="submit" className="btnbase primary_btn mt-4 mb-2 ">
          送出
        </button>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default agentJoin
