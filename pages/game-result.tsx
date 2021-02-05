import React, { useEffect } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import $ from 'jquery'

const GameResultPage: React.FC = () => {
  useEffect(() => {
    $('.result-title').on('click', function (e) {
      if ($(e.target).is('.show')) {
        $(this).removeClass('show')
        $(this).parent().find('.result-content').slideUp(300)
      } else {
        $(this).addClass('show').parent().find('.result-content').slideDown(300)
      }
      e.preventDefault()
    })
  }, [])
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
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default GameResultPage
