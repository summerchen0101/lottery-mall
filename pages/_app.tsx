import React from 'react'
import AlertProvider from '../context/AlertProvider'
import GlobalProvider from '../context/GlobalProvider'
import LoaderProvider from '../context/LoaderProvider'
import 'swiper/swiper.scss'
import DateProvider from '../context/DateProvider'

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
