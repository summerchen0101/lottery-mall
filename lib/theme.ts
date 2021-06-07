import { extendTheme } from '@chakra-ui/react'

const colors = {
  containerBg: {
    500: '#202629',
  },
  contentBg: {
    400: '#535b60',
    500: '#3d4448',
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
  darkblue: {
    500: '#0b4e79',
  },
}
const theme = extendTheme({ colors })

export default theme
