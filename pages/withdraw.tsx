import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/dist/client/router'
import { Select } from '@chakra-ui/select'
import TradeRankPopup from '@/components/popups/TradeRankPopup'
import TradePassPopup from '@/components/popups/TradePassPopup'

const WithdrawPage: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar
        back
        title="提领"
        extra={<button className="s-btn">提领记录</button>}
      />
      <>
        <div className="pintop-section fixed">
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
        </div>
        <div
          className="main-content section-padding"
          style={{ paddingTop: 105 }}
        >
          <form>
            <label className="form-label2">
              选择取款账户
              <span className="label-left text-lighgray">卡片数量:0/3</span>
              <span
                className="label-right text-blue"
                onClick={() => router.push('bankcard')}
              >
                账户设置
              </span>
            </label>
            {/* <div class="btnbase outline_btn color-blue" onclick="location.href = 'bankcard-add.html'">
  添加帐户
</div> */}
            <div className="form-group">
              <Select>
                <option>选择银行卡</option>
              </Select>
            </div>
            <label className="form-label2">提领金额</label>
            <div className="form-group d-flex flex-nowrap">
              <input
                type="number"
                className="form-input w-75 mr-2"
                required
                placeholder="可提领金额100~5000"
                id="withdrawal_amout"
              />
              <div className="btnbase primary_btn w-25 ft-15">最大额度</div>
            </div>
            <label className="form-label2">
              提领密码
              <span className="withdrawal-pw pointer label-right text-blue">
                前往设定
              </span>
            </label>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                required
                placeholder="请输入提领密码"
                id="withdrawal_pw"
              />
              {/* <i className="iconfont iconeye-close btn_eye" /> */}
            </div>
            {/* <div className="d-flex ft-15 ">
              申请金额:<span className="text-blue mx-2">0</span>元
            </div> */}
            <button
              type="button"
              className="btnbase primary_btn mt-4 mb-2"
              id="withdrawal_btn"
              data-toggle="modal"
              data-target="#withSuccessModal"
              // disabled
            >
              立即提领
            </button>
          </form>
        </div>
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default WithdrawPage
