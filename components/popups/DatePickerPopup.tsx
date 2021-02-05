import React from 'react'

function DatePickerPopup() {
  return (
    <div className="slide-up-section" id="search-date-type">
      <div className="content-col section-padding">
        <form>
          <a className="item-btn text-center">今日</a>
          <a className="item-btn text-center">昨日</a>
          <a className="item-btn text-center">本週</a>
          <a className="item-btn text-center">上週</a>
          <a className="item-btn text-center">本月</a>
          <a className="item-btn text-center">上月</a>
        </form>
      </div>
    </div>
  )
}

export default DatePickerPopup
