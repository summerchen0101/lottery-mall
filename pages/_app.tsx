import React from 'react'
import GlobalProvider from '@/context/GlobalProvider'
import LoaderProvider from '@/context/LoaderProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import 'swiper/swiper.scss'
import '@/style/global.scss'
import PopupProvider from '@/context/PopupContext'
import PaginationProvider from '@/context/PaginationProvider'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <ChakraProvider theme={theme}>
        <LoaderProvider>
          <PopupProvider>
            <PaginationProvider>
              <Component {...props} />
            </PaginationProvider>
          </PopupProvider>
        </LoaderProvider>
      </ChakraProvider>
    </GlobalProvider>
  )
}

export default MyApp
