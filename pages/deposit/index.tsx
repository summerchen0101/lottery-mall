import React, { useState } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import cs from 'classnames'
import { useRouter } from 'next/dist/client/router'
import { Box, Text } from '@chakra-ui/layout'
import { paywayOpts } from '@/lib/options'

const deposit: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(1)
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar
        back
        backPath="/my"
        title="充值"
        extra={
          <button
            className="s-btn"
            onClick={() => router.push('/deposit/record')}
          >
            充值记录
          </button>
        }
      />
      <>
        <div className="pintop-section d-flex justify-content-between fixed">
          <div className="info-col d-flex flex-column">
            {/* <div className="user-id-col">bet8888</div> */}
            <Box className="user-wallet-col" mt="3">
              <Text color="gray" d="inline-block" mr="2">
                账户余额
              </Text>
              20,849.55
            </Box>
          </div>
          <button className="icon_btn reload-btn">
            <i className="iconfont iconreload"></i>
          </button>
        </div>
        <div
          className="main-content section-padding"
          style={{ paddingTop: 105 }}
        >
          <form>
            <label className="form-label2">支付方式</label>
            <div className="method-btn-wrap">
              {paywayOpts.map((t, i) => (
                <div
                  key={i}
                  className={cs('outline_btn color-gray', {
                    active: currentTab === t.value,
                  })}
                  onClick={() => setCurrentTab(t.value)}
                >
                  {t.label}
                </div>
              ))}
            </div>
            <label className="form-label2">汇款姓名</label>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                required
                placeholder="请输入汇款人姓名"
              />
              <a className="iconfont iconclear btn_cancel" />
            </div>
            <label className="form-label2">存款金额</label>
            {/* <div className="method-btn-wrap">
              <div className="outline_btn color-gray">+50</div>
              <div className="outline_btn color-gray">+100</div>
              <div className="outline_btn color-gray">+1000</div>
              <div className="outline_btn color-gray">+5000</div>
            </div> */}
            <div className="form-group">
              <input
                type="number"
                className="form-input"
                required
                placeholder="单笔充值金额:200~5000"
              />
              <a className="iconfont iconclear btn_cancel" />
            </div>
            <button
              type="submit"
              className="btnbase primary_btn mt-4 mb-2"
              data-toggle="modal"
              data-target="#dpModal"
            >
              立即充值
            </button>
          </form>
        </div>
        {/* 彈窗 */}
        <div
          className="modal fade"
          id="dpModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-titlemodal-header" id="myModalLabel">
                  提示
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                公司银行卡不定期更换，每次充值请根据提交订单生成的银行卡转账，切勿直接转账至之前转入的银行卡，并且不要使用微信进行转账存款，否则无法到账，概不负责！
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btnbase primary_btn"
                  data-dismiss="modal"
                  // onClick="location.href = 'recharge-payment.html'"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <FooterNavBar />
    </Layout>
  )
}

export default deposit
