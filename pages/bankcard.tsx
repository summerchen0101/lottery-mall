import { useRouter } from 'next/dist/client/router'
import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box } from '@chakra-ui/layout'

const BankCardPage: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="銀行卡帳戶" />
      <div className="main-content section-padding">
        {/* 暫無數據 */}
        {/* <div class="data_null"><img src="images/data_null.svg">
          <p>目前无设置账户</p>
          <button type="submit" class="btnbase primary_btn mt-4 mb-2" data-toggle="modal"
              data-target="#realnameModal">添加账户</button>
          <div class="ft-13 text-lighgray mt-3 text-left">注意：帐户最多只能设置5个，如需新增帐户請刪減帐户後再進行添加</div>
      </div> */}
        <form>
          <ul className="bank-list list-group">
            {Array(3)
              .fill('')
              .map((t, i) => (
                <li key={i} className="bank-item">
                  <div className="d-flex justify-content-between">
                    <div className="bank-name w-50">台灣土地銀行 005</div>
                    <div className="user-name w-50 ">王*明</div>
                  </div>
                  <div className="bank-num">**** **** **** 54321</div>
                  <div className="check-mask">审核中，请耐心等候</div>
                  <div className="btn-wrap">
                    <button className="second_btn mr-1 w-50">刪除</button>
                    <button className="second_btn w-50">編輯</button>
                  </div>
                  <span className="focus">
                    <i className="iconcheck iconfont" />
                  </span>
                </li>
              ))}
          </ul>
          <button
            type="button"
            className="btnbase primary_btn mt-2 mb-2"
            data-toggle="modal"
            // onClick="location.href = 'bankcard-add.html'"
          >
            添加帳戶
          </button>
          <div className="ft-13 text-lighgray mt-3">
            注意：提款帐户最多只能綁定5个，如需綁定新帐户請刪減舊帐户後再進行添加
          </div>
        </form>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default BankCardPage
