import React from 'react'
import Backdrop from './Backdrop'
import MetaHead from './MetaHead'
import BettingPopup from './popups/BettingPopup'
import DatePickerPopup from './popups/DatePickerPopup'
import LeagueFilterPopup from './popups/LeagueFilterPopup'
import TradePassPopup from './popups/TradePassPopup'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MetaHead />
      <Backdrop />
      {children}
      <DatePickerPopup />
      <TradePassPopup />
      <BettingPopup />
    </>
  )
}

export default Layout
