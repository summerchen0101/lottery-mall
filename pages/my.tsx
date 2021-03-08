import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import MessageBadge from '@/components/MessageBadge'
import ProfileNickPopup from '@/components/popups/ProfileNickPopup'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Avatar } from '@chakra-ui/avatar'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const MyPage: React.FC = () => {
  const router = useRouter()
  const { fetchUserInfo } = useService()
  const { user } = useGlobalProvider()
  const { toCurrency } = useTransfer()

  useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar title="我的" extra={<MessageBadge />} />
      <div className="main-content">
        {/* 個人資訊 */}
        <div className="top-section">
          <div className="user-card">
            <div className="d-flex">
              <Avatar
                size="md"
                border="2px solid  #fff"
                p="2px"
                bg="transparent"
              />
              <div className="user-info d-flex flex-column justify-content-center">
                <div className="user-id-col d-flex">
                  {user?.acc} [{user?.name}]
                  <i className="iconfont iconedit ml-2 nickname" />
                </div>
                {/* <div className="last-login-col">
                  複製推廣碼
                  <span className=" ml-1">{user.promo_code}</span>
                </div> */}
              </div>
            </div>
            <ul className="acc-inner mt-3">
              <li className="acc-item">
                <p className="user-wallet">{toCurrency(user?.balance, 2)}</p>
                <span>可用余额</span>
              </li>
              <li className="divider" />
              <li className="acc-item">
                <p>{toCurrency(user?.bet_sum, 2)}</p>
                <span>交易中金额</span>
              </li>
            </ul>
          </div>
        </div>
        {/* 中間快速選單 */}
        <div className="middle-section">
          <ul className="middle-menu-list">
            <li
              className="menu-list-item"
              onClick={() => router.push('/profile')}
            >
              <img src="/images/ic_profile.svg" />
              个人资料
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/deposit')}
            >
              <img src="/images/ic_recharge.svg" />
              立即充值
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/withdraw')}
            >
              <img src="/images/ic_withdrawal.svg" />
              立即提领
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/transfer')}
            >
              <img src="/images/ic_withdrawal.svg" />
              立即轉點
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/cash-record')}
            >
              <img src="/images/ic_cashhistory.svg" />
              資金明細
            </li>
            {/* <li
              className="menu-list-item"
              onClick={() => router.push('/game-result')}
            >
              <img src="/images/ic_gameresult.svg" />
              比赛结果
            </li> */}

            <li
              className="menu-list-item"
              onClick={() => router.push('/bankcard')}
            >
              <img src="/images/ic_bankcard.svg" />
              银行卡
            </li>
            <li className="menu-list-item" onClick={() => router.push('/news')}>
              <img src="/images/ic_notice.svg" alt="" />
              公告
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/invite')}
            >
              <img src="/images/ic_invite.svg" alt="" />
              会员推广
            </li>
          </ul>
        </div>
        {/* 下方List選單 */}
        <div className="bottom-section section-padding">
          <ul className="bottom-menu-list list-group">
            {/* <li
              className="menu-list-item"
              onClick={() => router.push('/profile')}
            >
              <img src="/images/ic_profile.svg" />
              <div className="item-title">个人资料</div>
              <i className="iconfont iconallow-right" />
            </li> */}
            <li
              className="menu-list-item"
              onClick={() => router.push('/agent')}
            >
              <img src="/images/ic_agent.svg" />
              <div className="item-title">合营计划</div>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="menu-list-item" onClick={() => router.push('/faq')}>
              <img src="/images/ic_help.svg" />
              <div className="item-title">帮助中心</div>
              <i className="iconfont iconallow-right" />
            </li>
            <li
              className="menu-list-item"
              onClick={() => router.push('/about')}
            >
              <img src="/images/ic_about.svg" />
              <div className="item-title">关于AG</div>
              <i className="iconfont iconallow-right" />
            </li>
          </ul>
          <button
            className="btnbase outline_btn color-blue mt-4"
            onClick={() => router.push('/login')}
          >
            登出
          </button>
          <div className="version my-2">V.1.01</div>
        </div>
      </div>
      <ProfileNickPopup />
      <FooterNavBar />
    </Layout>
  )
}

export default MyPage
