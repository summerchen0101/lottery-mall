import React from 'react'

const CarouselBanner: React.FC = ({ children }) => {
  return (
    <div className="banner-section">
      <div className="swiper-container">
        <div className="swiper-wrapper">{children}</div>
        <div className="swiper-pagination" />
      </div>
    </div>
  )
}

export default CarouselBanner
