import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'

const PromotionDetailPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="优惠活动" />
      <div className="main-content">
        <div className="about-section section-padding">
          <div className="w-100 text-center py-3">
            <img src="/images/banner/banner-1.jpg" className="img-fluid" />
          </div>
          <div className="w-100 mt-2">
            <h5 className="text-blue font-weight-bold">充值达标送彩金</h5>
            <div className="text-lighgray">
              <small>有效时间:2020-12-05至2020-12-12</small>
            </div>
            <div className="news_title font-weight-bold">活动内容</div>
            <p>
              凡在美東時間1月27日至2月11日（即北京時間1月27日12:00至2月12日11:59），在此期間每天存款50元以上的新老會員參與
              “搶紅包過新年”大型搶紅包活動，每天1000萬現金紅包等您來搶，只要您參與，人人相互禮，趕緊邀請您的小伙伴一起來感受皇馬搶紅包的樂趣吧！
            </p>
            <div className="news_title font-weight-bold">申请时间及方式</div>
            <p>
              符合活動要求的會員，請於北京時間次日15:00至23:59之間點擊搶紅包活動輸入會員賬號參與搶紅包，中獎的紅包金額系統將在30分鐘內派發至您的遊戲賬號內；
              逾期認為自動放棄該優惠！
            </p>
          </div>
        </div>
        <div className="mask" id="mask" />
        {/* 編輯彈窗 */}
        <div className="slide-up-section" id="message-edit">
          <div className="title-col">
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col background-gray">
            <a className="item-btn text-center close_btn">删除</a>
            <a className="item-btn close_btn  text-center">取消</a>
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default PromotionDetailPage
