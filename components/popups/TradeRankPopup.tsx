import React from 'react'

function TradeRankPopup() {
  return (
    <div
      className="modal fade"
      id="chartsModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-titlemodal-header" id="myModalLabel">
              交易明细排行
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <div className="modal-body">
            <div className="league-col text-center text-lighgray">
              瑞典北部甲组联赛
            </div>
            <div className="text-center ft-15 mt-2">富山胜利(主)VS熊本深红</div>
            <div className="total-vol-col my-3 ft-14">总成交量：4,202,657</div>
            <ul className="vol-list">
              <li className="vol-list-item">
                <div className="data_1">0-0</div>
                <div className="data_2 progress">
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: '25%' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="data_3">1,907</div>
              </li>
              <li className="vol-list-item">
                <div className="data_1">0-1</div>
                <div className="data_2 progress">
                  <div
                    className="progress-bar background-red"
                    role="progressbar"
                    style={{ width: '100%' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="data_3">12,190,712</div>
              </li>
              <li className="vol-list-item">
                <div className="data_1">0-2</div>
                <div className="data_2 progress">
                  <div
                    className="progress-bar background-green"
                    role="progressbar"
                    style={{ width: '60%' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="data_3">621,907</div>
              </li>
              <li className="vol-list-item">
                <div className="data_1">0-3</div>
                <div className="data_2 progress">
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: '80%' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="data_3">1,121,907</div>
              </li>
              <li className="vol-list-item">
                <div className="data_1">0-3</div>
                <div className="data_2 progress">
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: '80%' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="data_3">1,121,907</div>
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btnbase primary_btn"
              data-dismiss="modal"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeRankPopup
