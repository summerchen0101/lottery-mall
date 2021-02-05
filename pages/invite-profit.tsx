import DateTabGroup from '@/components/DateTabGroup'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const inviteProfit: React.FC = () => {
  return (
    <Layout>
      <HeaderTitleBar back title="推广收益" />
      <div className="main-content section-padding ">
        <DateTabGroup />
        <Box mt="10px">
          <table className="team">
            <tbody>
              <tr>
                <th>帐号/暱稱</th>
                <th>xxx</th>
                {/* <th>xxx</th> */}
              </tr>
              {Array(10)
                .fill('')
                .map((t, i) => (
                  <tr key={i}>
                    <td>bet888 [王曉明]</td>
                    <td>0</td>
                    {/* <td>0</td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default inviteProfit
