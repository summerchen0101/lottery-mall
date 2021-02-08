import React from 'react'
import AlertProvider from '@/context/AlertProvider'
import GlobalProvider from '@/context/GlobalProvider'
import LoaderProvider from '@/context/LoaderProvider'
import DateProvider from '@/context/DateProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import 'swiper/swiper.scss'
import '@/style/global.scss'
import PopupProvider from '@/context/PopupContext'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <DateProvider>
        <ChakraProvider theme={theme}>
          <LoaderProvider>
            <PopupProvider>
              <AlertProvider>
                <Component {...props} />
              </AlertProvider>
            </PopupProvider>
          </LoaderProvider>
        </ChakraProvider>
      </DateProvider>
    </GlobalProvider>
  )
}

export default MyApp
