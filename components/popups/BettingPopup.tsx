import { useGlobalProvider } from '@/context/GlobalProvider'
import React from 'react'

function BettingPopup() {
  const { bettingInfo } = useGlobalProvider()
  if (!bettingInfo) return <></>
  return (
    <div
      className="modal fade"
      id="betlistModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-titlemodal-header" id="myModalLabel">
              下注資訊
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <pre>{JSON.stringify(bettingInfo)}</pre>
          <div className="modal-body">
            <div className="league-col text-center text-lighgray">
              瑞典北部甲组联赛
            </div>
            <div className="text-center ft-15 my-2">富山胜利(主)VS熊本深红</div>
            <div className="time-col text-center ft-13 mb-2">
              2020-09-02 14:00
            </div>
            <div className="background-gray ft15 text-center py-3">
              您正在<span className="text-red">反对</span>这场赛事结果为
              <br />
              全场 波胆 0-0 <span className="text-blue">@4.2</span>
            </div>
            <div className="d-flex justify-content-between py-3">
              <div className="user-wallet">余额 20,849.55</div>
              <div className="handling-charge">手续费5%</div>
            </div>
            <div className="method-btn-wrap">
              <input
                type="number"
                className="method-input w-50"
                id="capital"
                required
                placeholder="本金"
              />
              <input
                type="number"
                className="method-input w-50"
                id="profit"
                required
                placeholder="可赢 $0"
                disabled
              />
            </div>
            <div className="method-btn-wrap">
              {/* <input
                type="number"
                className="outline_btn color-gray trans-input"
                defaultValue={50}
              /> */}
              <div className="outline_btn color-gray trans-input">+50</div>
              <div className="outline_btn color-gray trans-input">+100</div>
              <div className="outline_btn color-gray trans-input">+1000</div>
              <div className="outline_btn color-gray trans-input">+5000</div>
            </div>
            {/* <div className="method-btn-wrap">
              <div className="outline_btn color-gray">清除</div>
              <div className="outline_btn color-gray">修改</div>
              <div className="flex2 outline_btn color-gray">余额全投</div>
            </div> */}
            {/* <P class="w-100 text-yellow"><i class="iconremind iconfont mr-1"></i>盘口、赔率已产生变化</P> */}
          </div>
          <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
            <button
              type="button"
              className="btnbase outline_btn color-blue"
              data-dismiss="modal"
            >
              关闭视窗
            </button>
            <button
              type="button"
              className="btnbase primary_btn"
              id="bet_btn"
              data-dismiss="modal"
              // disabled
            >
              立即投注
            </button>
            {/* <button type="button" class="btnbase primary_btn color-yellow">接受变化</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BettingPopup
