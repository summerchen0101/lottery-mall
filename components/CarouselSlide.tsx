import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

const CarouselSlide: React.FC<{ image?: string } & BoxProps> = ({
  image,
  ...props
}) => {
  return (
    <Box className="swiper-slide" {...props}>
      <img src={image} className="d-block w-100" />
    </Box>
  )
}

export default CarouselSlide
