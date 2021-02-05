import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Select } from '@chakra-ui/select'

const BankCardAddPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="添加银行卡" />
      <div className="main-content section-padding">
        <form>
          <div className="form-group">
            <label className="form-label2">银行名称</label>
            <Select>
              <option>请选择银行</option>
            </Select>
            <label className="form-label2">分行/分部名称</label>
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-input"
                required
                placeholder="请输入分行/分部名称"
              />
              <i className="iconfont iconclear btn_cancel" />
            </div>
            <label className="form-label2">帐户号码</label>
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-input"
                required
                placeholder="请输入银行帐号"
              />
              <i className="iconfont iconclear btn_cancel" />
            </div>
            <small className="text-lighgray">
              请认真校对银行帐号，帐号错误资金将无法到账
            </small>
            <label className="form-label2">帐户名称</label>
            <div className="form-group mb-1">
              <input
                type="text"
                className="form-input"
                required
                placeholder="请输入帐户持有人姓名"
              />
              <i className="iconfont iconclear btn_cancel" />
            </div>
            <small className="text-lighgray d-block">
              为了您的资金能够迅速到账，请确保填写的姓名与账户姓名一致
            </small>
            <label className="form-label2 w-25">预设帐户</label>
            <label className="form-switch">
              <input type="checkbox" />
              <span className="slider " />
            </label>
            <label className="form-label2">照片上传</label>
            <div className="form-upload mb-1">
              <button type="button" className="text-area">
                <i className="iconfont iconadd" />
                <span className="text-lighgray">
                  支持扩展名 .rar .zip .doc .docx .pdf .jpg...
                  <br />
                  （圖片最大上傳檔案大小：8 MB)
                </span>
              </button>
              <input className="upload" type="file" name="filename" />
            </div>
            <p className="ft-14 text-red">
              <i className="iconfont iconremind mr-1" />
              银行卡号须与开卡人姓名一致（实名认证人）
            </p>
          </div>
          <button type="submit" className="btnbase primary_btn mt-2 mb-2">
            确定送出
          </button>
        </form>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default BankCardAddPage
