import React from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'

const GameResultPage: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="比賽結果" />
      <div className="main-content">
        <div className="list-container">
          <div className="result-item">
            <div className="result-title section-padding">
              <div className="league-col">葡超(3)</div>
              <i className="iconfont iconallow-down" />
            </div>
            <div className="result-content">
              <div className="team-wrap">
                <div className="datetime">时间</div>
                <div className="teaminfo">对阵</div>
                <div className="result-score">全场</div>
                <div className="result-score">上半</div>
                <div className="resul-total-score">总分</div>
              </div>
              <div className="result-wrap clearfix">
                <div className="team-wrap">
                  <div className="datetime">07-08 12:54</div>
                  <div className="teaminfo">
                    <div>比兰尼塞斯</div>
                    <div>法伦斯</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div>1</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div>1</div>
                  </div>
                  <div className="resul-total-score">1</div>
                </div>
                <div className="team-wrap">
                  <div className="datetime">07-08 12:54</div>
                  <div className="teaminfo">
                    <div>比兰尼塞斯</div>
                    <div>法伦斯</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="resul-total-score">1</div>
                </div>
                <div className="team-wrap">
                  <div className="datetime">07-08 12:54</div>
                  <div className="teaminfo">
                    <div>比兰尼塞斯</div>
                    <div>法伦斯</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="resul-total-score">1</div>
                </div>
              </div>
            </div>
          </div>
          <div className="result-item">
            <div className="result-title section-padding">
              <div className="league-col">葡超(2)</div>
              <i className="iconfont iconallow-down" />
            </div>
            <div className="result-content">
              <div className="team-wrap">
                <div className="datetime">时间</div>
                <div className="teaminfo">对阵</div>
                <div className="result-score">全场</div>
                <div className="result-score">上半</div>
                <div className="resul-total-score">总分</div>
              </div>
              <div className="result-wrap clearfix">
                <div className="team-wrap">
                  <div className="datetime">07-08 12:54</div>
                  <div className="teaminfo">
                    <div>比兰尼塞斯</div>
                    <div>法伦斯</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div>1</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div>1</div>
                  </div>
                  <div className="resul-total-score">1</div>
                </div>
                <div className="team-wrap">
                  <div className="datetime">07-08 12:54</div>
                  <div className="teaminfo">
                    <div>比兰尼塞斯</div>
                    <div>法伦斯</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="result-score">
                    <div>0</div>
                    <div className="text-red">1</div>
                  </div>
                  <div className="resul-total-score">1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 彈窗 */}
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
                <button className="icon_btn">
                  <i className="iconfont iconreload" />
                </button>
                <h5 className="modal-titlemodal-header" id="myModalLabel">
                  联盟筛选
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
                <form>
                  <div className="main-sort-col">
                    <div>
                      <input type="radio" name="sort" defaultValue="pupular" />
                      <label>热门排序</label>
                    </div>
                    <div>
                      <input type="radio" name="sort" defaultValue="time" />
                      <label>时间排序</label>
                    </div>
                    <div>
                      <input type="checkbox" id="checkall" defaultValue="all" />
                      <label>全选</label>
                    </div>
                  </div>
                  <div className="league-filter">
                    <ul className="check-list">
                      <li className="check-item w-50">
                        <input type="checkbox" name="Checkbox[]" />
                        <label>葡超(10)</label>
                      </li>
                      <li className="check-item w-50">
                        <input type="checkbox" name="Checkbox[]" />
                        <label>波超(30)</label>
                      </li>
                      <li className="check-item w-50">
                        <input type="checkbox" name="Checkbox[]" />
                        <label>瑞典超(51)</label>
                      </li>
                      <li className="check-item w-50">
                        <input type="checkbox" name="Checkbox[]" />
                        <label>英冠(25)</label>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
                <button
                  type="button"
                  className="btnbase outline_btn color-blue"
                >
                  关闭视窗
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
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default GameResultPage
