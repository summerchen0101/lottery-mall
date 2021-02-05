import React from 'react'

function DateTabGroup() {
  return (
    <ul
      className="nav nav-tabs d-flex justify-content-between section-padding"
      role="tablist"
    >
      <li className="nav-item">
        <a
          className="nav-link active"
          data-toggle="tab"
          href="#tabs-1"
          role="tab"
        >
          本週
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
          上週
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
          本月
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
          上月
        </a>
      </li>
    </ul>
  )
}

export default DateTabGroup
