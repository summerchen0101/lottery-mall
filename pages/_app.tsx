import BetInfoProvider from '@/context/BetInfoProvider'
import GlobalProvider from '@/context/GlobalProvider'
import PaginationProvider from '@/context/PaginationProvider'
import PopupProvider from '@/context/PopupContext'
import theme from '@/lib/theme'
import '@/style/global.scss'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <ChakraProvider theme={theme}>
        <PopupProvider>
          <PaginationProvider>
            <BetInfoProvider>
              <Component {...props} />
            </BetInfoProvider>
          </PaginationProvider>
        </PopupProvider>
      </ChakraProvider>
    </GlobalProvider>
  )
}

export default MyApp
