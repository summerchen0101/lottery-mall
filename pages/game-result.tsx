import DateTabGroup from '@/components/DateTabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { beforeDateRangeOpts } from '@/lib/options'
import useRequest from '@/utils/useRequest'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'

const jqEffectFunc = function (e) {
  if ($(e.target).is('.show')) {
    $(this).removeClass('show')
    $(this).parent().find('.result-content').slideUp(300)
  } else {
    $(this).addClass('show').parent().find('.result-content').slideDown(300)
  }
  e.preventDefault()
}

const GameResultPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const API = useRequest()
  const fetchScores = async () => {
    try {
      await API.getScoreList()
    } catch (err) {}
  }
  useEffect(() => {
    $('.result-title').on('click', jqEffectFunc)
    fetchScores()
    return () => {
      $('.result-title').off()
    }
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="比赛结果" />
      <div className="main-content">
        <TabGroup justifyContent="space-between">
          {beforeDateRangeOpts.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={t.value === currentTab}
              onClick={() => setCurrentTab(t.value)}
            />
          ))}
        </TabGroup>
        <div className="list-container">
          {Array(4)
            .fill('')
            .map((g, g_i) => (
              <div key={g_i} className="result-item">
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
                    {Array(4)
                      .fill('')
                      .map((t, i) => (
                        <div key={i} className="team-wrap">
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
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default GameResultPage
