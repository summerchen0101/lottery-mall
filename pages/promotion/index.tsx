import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useTransfer from '@/utils/useTransfer'
import useRequest from '@/utils/useRequest'
import { Activity } from '@/lib/types'
import { Image } from '@chakra-ui/react'

const PromotionPage: React.FC = () => {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [activities, setActivities] = useState<Activity[]>([])
  const fetchActivity = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getActivityList()
      setActivities(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchActivity()
  }, [])
  return (
    <Layout>
      <HeaderTitleBar back title="优惠活动" />
      <div className="main-content section-padding">
        <div className="list-container">
          {activities.map((t, i) => (
            <div
              key={i}
              className="promotion-item"
              onClick={() => router.push(`/promotion/${t.id}`)}
            >
              <div className="promotion-img">
                <Image src={t.img_mobile} className="img-fluid" />
              </div>
              <div className="promotion-content">
                <div className="ft-16 promotion-title mb-1">{t.title}</div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="ft-13 text-lighgray">
                    <span>活动时间:</span>
                    {t.start_at ? (
                      <span>
                        {toDate(t.start_at)} 至 {toDate(t.end_at)}
                      </span>
                    ) : (
                      '無限期'
                    )}
                  </span>
                  <button className="mini_btn color-blue">查看详情</button>
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

export default PromotionPage
