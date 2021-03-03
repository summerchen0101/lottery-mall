import { Banner } from '@/lib/types'
import { Image } from '@chakra-ui/image'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Pagination, Autoplay])
const CarouselBanner: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  const router = useRouter()
  return (
    <div className="banner-section">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        speed={500}
        className="swiper-container"
        pagination={{ clickable: true }}
      >
        {banners.map((t, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            {t.url ? (
              <Link href={t.url}>
                <a target={t.is_blank ? '_blank' : '_self'}>
                  <Image src={t.img_mobile} />
                </a>
              </Link>
            ) : (
              <Image src={t.img_mobile} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselBanner
