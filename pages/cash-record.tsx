import React from 'react'
import CashRecordItem from '../components/CashRecordItem'
import FooterNavBar from '../components/FooterNavBar'
import HeaderTitleBar from '../components/HeaderTitleBar'
import Layout from '../components/Layout'

const CashRecordPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="交易明细" />
      <div className="main-content">
        <ul
          className="nav nav-tabs d-flex justify-content-between section-padding"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#tabs-1"
              role="tab"
            >
              今日
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
              近3日
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
              近7日
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
              查询
            </a>
          </li>
        </ul>
        <div className="pintop-section d-flex flex-column justify-content-center">
          <ul className="acc-inner mt-1">
            <li className="acc-item px-5">
              <p>3000.00</p>
              <span className="text-lighgray">总提现笔额</span>
            </li>
            <li className="divider" />
            <li className="acc-item px-5">
              <p className="user-wallet">2</p>
              <span className="text-lighgray">总提现笔数</span>
            </li>
          </ul>
        </div>
        <div className="tab-content pt-2 section-padding">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            {/* 暫無數據 */}
            {/* <div class="data_null"><img src="images/data_null.svg">
              <p>暂无数据</p>

          </div> */}
            <div className="list-container">
              {[...Array(5)].map((_, i) => (
                <CashRecordItem key={i} />
              ))}
            </div>
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            {/* 暫無數據 */}
            <div className="data_null">
              <img src="images/data_null.svg" />
              <p>暂无数据</p>
            </div>
          </div>
          <div className="tab-pane" id="tabs-3" role="tabpanel">
            {/* 暫無數據 */}
            <div className="data_null">
              <img src="images/data_null.svg" />
              <p>暂无数据</p>
            </div>
          </div>
          <div className="tab-pane" id="tabs-4" role="tabpanel">
            {/* 暫無數據 */}
            {/* <div class="data_null"><img src="images/data_null.svg">
                          <p>暂无数据</p>

                      </div> */}
            <form>
              <div className="form-group form-date-picker">
                <input
                  type="date"
                  className="form-input"
                  name="start"
                  placeholder="请选择日期"
                />
                <span>至</span>
                <input
                  type="date"
                  className="form-input"
                  name="start"
                  placeholder="请选择日期"
                />
              </div>
              <button
                type="submit"
                className="btnbase primary_btn mt-4 mb-2"
                data-toggle="modal"
                data-target="#"
              >
                查询
              </button>
            </form>
          </div>
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default CashRecordPage
