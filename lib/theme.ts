import { extendTheme } from '@chakra-ui/react'

const colors = {
  baseBg: {
    500: '#202629',
  },
  baseText: {
    500: '#8a8a8a',
  },
  brand: {
    500: '#bca16f',
  },
  gray: {
    500: '#4A5359',
  },
}
const theme = extendTheme({ colors })

export default theme
