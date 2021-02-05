import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import Tab from '@/components/Tab'
import TabGroup from '@/components/TabGroup'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

const tabs = [
  { label: '系統通知', value: 1 },
  { label: '賽事資訊', value: 2 },
  { label: '優惠活動', value: 3 },
]
const news: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="公告" />
      <div className="main-content">
        <TabGroup justifyContent="space-between">
          {tabs.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              active={current === t.value}
              onClick={() => setCurrent(t.value)}
            />
          ))}
        </TabGroup>

        {/* Tab panes */}
        <div className="tab-content section-padding">
          {/* 暫無數據 */}
          {/* <div class="data_null"><img src="images/data_null.svg"><p>暂无数据</p></div> */}
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <ul className="list-container list-group">
              {Array(8)
                .fill('')
                .map((t, i) => (
                  <li
                    key={i}
                    className="message-item"
                    onClick={() => router.push(`/news/${i + 1}`)}
                  >
                    <div className="message-container d-flex flex-column">
                      <div className="title-col">
                        <div className="message-title">會員首儲優惠</div>
                        <div className="message-time text-right">
                          2021-02-10
                        </div>
                      </div>
                      <div className="message-content-col">
                        尊敬的会员您好，因应近日支付宝提升安全机制，部分会员限制转账，如遇无法打款至本平台支付宝帐号。
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
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
        </div>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default news
