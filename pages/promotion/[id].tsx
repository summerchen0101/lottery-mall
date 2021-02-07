import React, { useEffect, useMemo, useState } from 'react'
import FooterNavBar from '@/components/FooterNavBar'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useTransfer from '@/utils/useTransfer'
import useRequest from '@/utils/useRequest'
import { ActivityDetail } from '@/lib/types'
import { useRouter } from 'next/dist/client/router'

const PromotionDetailPage: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [activity, setActivity] = useState<ActivityDetail>(null)
  const router = useRouter()
  const id = useMemo(() => +router.query.id, [router.query])

  const fetchActivity = async () => {
    loadingStart()
    try {
      const res = await API.getActivityDetail(id)
      setActivity(res.data)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchActivity()
  }, [id])
  return (
    <Layout>
      <HeaderTitleBar back title="优惠活动" />
      <div className="main-content">
        {activity && (
          <div className="about-section section-padding">
            <div className="w-100 text-center py-3">
              <img src={activity.img_mobile} className="img-fluid" />
            </div>
            <div className="w-100 mt-2">
              <h5 className="text-blue font-weight-bold">{activity.title}</h5>
              <div className="text-lighgray">
                <small>
                  活动时间:
                  {activity.start_at ? (
                    <>
                      {toDate(activity.start_at)}至{toDate(activity.end_at)}
                    </>
                  ) : (
                    '無限期'
                  )}
                </small>
              </div>

              <div className="activity_title font-weight-bold">活动内容</div>
              <p>{activity.content_mobile}</p>

              {/* <button type="button" className="btnbase primary_btn mt-4">
              活动申请
            </button> */}
            </div>
          </div>
        )}
      </div>

      <FooterNavBar />
    </Layout>
  )
}

export default PromotionDetailPage
