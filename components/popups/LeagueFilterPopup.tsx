import React from 'react'

function LeagueFilterPopup() {
  return (
    <div
      className="modal fade"
      id="leagueModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button className="icon_btn reload-btn">
              <i className="iconfont iconreload" />
            </button>
            <h5 className="modal-titlemodal-header" id="myModalLabel">
              联盟筛选
            </h5>
            <button
              type="button"
              className="close icon_btn"
              data-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="main-sort-col">
                <label className="form-radio ">
                  <input
                    className="input-check"
                    name="sort"
                    defaultValue="热门排序"
                    type="radio"
                    defaultChecked
                  />
                  <span className="checkmark" />
                  热门排序
                </label>
                <label className="form-radio ">
                  <input
                    className="input-check"
                    name="sort"
                    defaultValue="时间排序"
                    type="radio"
                    defaultChecked
                  />
                  <span className="checkmark" />
                  时间排序
                </label>
              </div>
              <div className="league-filter">
                <ul className="check-inner">
                  <li className="check-item">
                    <label className="form-checkbox">
                      <input
                        className="input-check"
                        type="checkbox"
                        id="checkall"
                      />
                      <span className="checkmark" />
                      全部
                    </label>
                  </li>
                  <li className="check-item">
                    {' '}
                    <label className="form-checkbox">
                      <input
                        className="input-check"
                        type="checkbox"
                        name="Checkbox"
                      />
                      <span className="checkmark" />
                      葡超(20)
                    </label>
                  </li>
                  <li className="check-item">
                    <label className="form-checkbox">
                      <input
                        className="input-check"
                        type="checkbox"
                        name="Checkbox"
                      />
                      <span className="checkmark" />
                      波超(15)
                    </label>
                  </li>
                  <li className="check-item">
                    <label className="form-checkbox">
                      <input
                        className="input-check"
                        type="checkbox"
                        name="Checkbox"
                      />
                      <span className="checkmark" />
                      瑞典超(6)
                    </label>
                  </li>
                  <li className="check-item">
                    <label className="form-checkbox">
                      <input
                        className="input-check"
                        type="checkbox"
                        name="Checkbox"
                      />
                      <span className="checkmark" />
                      英冠(12)
                    </label>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
            <button type="button" className="btnbase outline_btn color-blue">
              关闭窗口
            </button>
            <button
              type="button"
              className="btnbase primary_btn"
              data-dismiss="modal"
            >
              确认搜寻
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeagueFilterPopup
