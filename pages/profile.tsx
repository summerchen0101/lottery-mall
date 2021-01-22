import React from 'react'
import FooterNavBar from '../components/FooterNavBar'
import HeaderTitleBar from '../components/HeaderTitleBar'
import Layout from '../components/Layout'

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar title="个人资料" />
      <>
        <div className="main-content background-gray">
          <ul className="list-group col-list">
            <li className="thead col-list-item section-padding pointer">
              基本资料
            </li>
            <li className="nickname col-list-item section-padding pointer">
              昵称
              <span className="text-lighgray item-title text-right">
                未设置
              </span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="name col-list-item section-padding pointer">
              真实姓名
              <span className="text-lighgray item-title text-right">
                姓名须与银行卡一致
              </span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="thead col-list-item section-padding pointer">
              账户安全
            </li>
            <li className="email col-list-item section-padding pointer">
              电子邮箱
              <span className="text-red item-title text-right">未认证</span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="tel col-list-item section-padding pointer">
              手机号码
              <span className="text-red item-title text-right">未认证</span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="login-pw col-list-item section-padding pointer">
              密码修改
              <span className="text-lighgray item-title text-right">修改</span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="thead col-list-item section-padding pointer">
              社群
            </li>
            <li className="wechat col-list-item section-padding pointer">
              微信
              <span className="text-lighgray item-title text-right">
                未设置
              </span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="qq col-list-item section-padding pointer">
              QQ
              <span className="text-lighgray item-title text-right">
                未设置
              </span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="thead col-list-item section-padding pointer">
              金融
            </li>
            <li className="bank-card col-list-item section-padding">
              银行卡
              <span className="text-red item-title text-right">未设置</span>
              <i className="iconfont iconallow-right" />
            </li>
            <li className="withdrawal-pw col-list-item section-padding pointer">
              提领密码
              <span className="text-red item-title text-right">未设置</span>
              <i className="iconfont iconallow-right" />
            </li>
          </ul>
          <div className="register_time pt-3 text-lighgray">
            注册时间<span>2020/06/08 15:50:16</span>
          </div>
        </div>
        <div className="mask" id="mask" />
        {/* 暱稱修改 */}
        <div className="slide-up-section" id="nickname-edit">
          <div className="title-col">
            昵称修改
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">昵称</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入昵称"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 真實姓名 */}
        <div className="slide-up-section" id="name-edit">
          <div className="title-col">
            真实姓名修改
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">真实姓名</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入真实姓名"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 邮箱账号 */}
        <div className="slide-up-section" id="email-edit">
          <div className="title-col">
            邮箱账号
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <div className="descript">
                为了您的安全，信息在送出后将无法修改，如需帮助请
                <a href="#">联系客服</a>
              </div>
              <label className="form-label">邮箱账号</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入邮箱账号"
                />
                <a className="captcha">获取验证码</a>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入邮箱验证码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 手机号码 */}
        <div className="slide-up-section" id="tel-edit">
          <div className="title-col">
            手机号码
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <div className="descript">
                为了您的安全，信息在送出后将无法修改，如需帮助请
                <a href="#">联系客服</a>
              </div>
              <label className="form-label">手机号码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入手机号码"
                />
                <a className="captcha">获取验证码</a>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入短信验证码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 密碼修改 */}
        <div className="slide-up-section" id="login-pw-edit">
          <div className="title-col">
            密码修改
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">当前密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入旧密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <label className="form-label">新密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入确认密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <label className="form-label">确认新密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="再次确认密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 微信 */}
        <div className="slide-up-section" id="wechat-edit">
          <div className="title-col">
            微信
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">微信帐号</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入微信帐号"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* QQ */}
        <div className="slide-up-section" id="qq-edit">
          <div className="title-col">
            QQ
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">QQ帐号</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="請輸入QQ帐号"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
        {/* 银行卡 */}
        <div className="slide-up-section" id="bank-card-edit">
          <div className="title-col">
            银行卡
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col background-gray section-padding">
            <form>
              <a className="item-btn ">中国工商银行 (9372)</a>
              <a className="item-btn ">中国邮政 (1223)</a>
              <a className="item-btn ">添加銀行卡</a>
              <a className="item-btn close_btn">取消</a>
            </form>
          </div>
        </div>
        {/* 提领密码 */}
        <div className="slide-up-section" id="withdrawal-pw-edit">
          <div className="title-col">
            提领密码
            <a className="close_btn iconfont iconclose" />
          </div>
          <div className="content-col modals-section-padding">
            <form>
              <label className="form-label">当前密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入旧密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <label className="form-label">新密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="请输入确认密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <label className="form-label">确认新密码</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input account-input"
                  required
                  placeholder="再次确认密码"
                />
                <a className="iconfont iconclear btn_cancel" />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2 remove-slide"
              >
                送出
              </button>
            </form>
          </div>
        </div>
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default ProfilePage
