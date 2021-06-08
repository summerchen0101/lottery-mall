import React from 'react'
import GlobalProvider from '@/context/GlobalProvider'
import LoaderProvider from '@/context/LoaderProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import 'react-datepicker/dist/react-datepicker.css'
import '@/style/global.scss'
import PopupProvider from '@/context/PopupContext'
import PaginationProvider from '@/context/PaginationProvider'
import BetInfoProvider from '@/context/BetInfoProvider'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <ChakraProvider theme={theme}>
        <LoaderProvider>
          <PopupProvider>
            <PaginationProvider>
              <BetInfoProvider>
                <Component {...props} />
              </BetInfoProvider>
            </PaginationProvider>
          </PopupProvider>
        </LoaderProvider>
      </ChakraProvider>
    </GlobalProvider>
  )
}

export default MyApp
