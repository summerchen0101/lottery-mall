import { Banner } from '@/lib/types'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

const CarouselBanner: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  console.log(banners)
  const router = useRouter()
  return (
    <div className="banner-section">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        speed={500}
        className="swiper-container"
        pagination={{ el: '.swiper-pagination', clickable: true }}
      >
        {banners.map((t, i) => (
          <SwiperSlide
            className="swiper-slide"
            key={i}
            onClick={() => router.push(t.url)}
          >
            <img src={t.img_mobile} className="d-block w-100" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselBanner
