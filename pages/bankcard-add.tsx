import React from 'react'
import FooterNavBar from '../components/FooterNavBar'
import HeaderTitleBar from '../components/HeaderTitleBar'
import Layout from '../components/Layout'

const BankCardAddPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="添加银行卡" />
      <>
        <div className="main-content section-padding">
          {/* 暫無數據 */}
          {/* <div class="data_null"><img src="images/data_null.svg">
          <p>暂无数据</p>
          <button type="submit" class="btnbase primary_btn mt-4 mb-2" data-toggle="modal"
              data-target="#realnameModal">添加银行卡</button>
          <div class="ft-13 text-lighgray mt-3 text-left">注意：提款銀行卡最多只能綁定5張，如需綁定新銀行卡請刪減一張舊卡後再進行添加</div>
      </div> */}
          <form>
            <ul className="col-list list-group ">
              <li className="col-list-item border-bottom active">
                <label>
                  <input className="card-check" type="radio" name="bankcard" />
                  中国工商银行 (9372)
                </label>
              </li>
              <li className="col-list-item border-bottom">
                <label>
                  <input className="card-check" type="radio" name="bankcard" />
                  中国邮政 (1223)
                </label>
              </li>
              <li className="col-list-item border-bottom">
                <label>
                  <input className="card-check" type="radio" name="bankcard" />
                  中国农业银行 (2137)
                </label>
              </li>
              <li className="col-list-item border-bottom">
                <label>
                  <input className="card-check" type="radio" name="bankcard" />
                  中国农业银行 (2137)
                </label>
              </li>
            </ul>
            <button
              type="submit"
              className="btnbase primary_btn mt-4 mb-2"
              // onClick="location.href = 'bankcard-add.html'"
            >
              添加银行卡
            </button>
            <div className="ft-13 text-lighgray mt-3">
              注意：提款銀行卡最多只能綁定5張，如需綁定新銀行卡請刪減一張舊卡後再進行添加
            </div>
          </form>
        </div>
        {/* 彈窗 */}
        <div
          className="modal fade"
          id="realnameModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-titlemodal-header" id="myModalLabel">
                  未实名认证
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
              <div className="modal-body text-capitalize">
                <h3 className="text-center ft-16">
                  请先实名认证才可绑定银行卡
                </h3>
              </div>
              <div className="modal-footer">
                <button type="button" className="btnbase primary_btn">
                  实名认证
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="delcardModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-titlemodal-header" id="myModalLabel">
                  删除银行卡
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
              <div className="modal-body text-capitalize ">
                <h3 className="text-center ft-16 text-red">
                  删除已绑定银行卡?
                </h3>
              </div>
              <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
                <button
                  type="button"
                  className="btnbase outline_btn color-blue"
                  data-dismiss="modal"
                >
                  关闭视窗
                </button>
                <button type="button" className="btnbase primary_btn">
                  删除
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

export default BankCardAddPage
