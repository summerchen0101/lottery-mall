import React from 'react'
import AlertProvider from '../context/AlertProvider'
import GlobalProvider from '../context/GlobalProvider'
import LoaderProvider from '../context/LoaderProvider'
import DateProvider from '../context/DateProvider'

import 'swiper/swiper.scss'
import '../style/global.scss'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <DateProvider>
        <LoaderProvider>
          <AlertProvider>
            <Component {...props} />
          </AlertProvider>
        </LoaderProvider>
      </DateProvider>
    </GlobalProvider>
  )
}

export default MyApp
