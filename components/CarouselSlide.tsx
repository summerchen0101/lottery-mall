import React from 'react'

const CarouselSlide: React.FC<{ image?: string }> = ({ image }) => {
  return (
    <div className="swiper-slide">
      <img src={image} className="d-block w-100" />
    </div>
  )
}

export default CarouselSlide
