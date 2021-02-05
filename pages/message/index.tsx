import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const message: React.FC = () => {
  const router = useRouter()
  return (
    <Layout>
      <HeaderTitleBar back title="站内信" />
      <div className="main-content">
        <Box as="ul" className="list-container list-group" mx="2">
          {Array(5)
            .fill('')
            .map((t, i) => (
              <li
                key={i}
                className="message-item"
                onClick={() => router.push(`/message/${i + 1}`)}
              >
                <label className="form-checkbox message-select">
                  <input
                    className="input-check"
                    type="checkbox"
                    name="Checkbox"
                  />
                  <span className="checkmark" />
                </label>
                {/* <input type="checkbox" class="message-select"> */}
                <i className="iconfont iconmail" />
                <div className="message-container d-flex flex-column">
                  <div className="title-col">
                    <div className="message-title">保本活动重要通知</div>
                    <div className="message-time text-right">2021-02-23</div>
                  </div>
                  <div className="message-content-col">
                    尊敬的会员您好，因应近日支付宝提升安全机制，部分会员限制转账，如遇无法打款至本平台支付宝帐号，
                  </div>
                </div>
              </li>
            ))}
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default message
