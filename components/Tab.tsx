import React from 'react'
import cs from 'classnames'
const Tab: React.FC<{
  active?: boolean
  label: string
}> = ({ active, label }) => {
  return (
    <li className="nav-item">
      <a className={cs('nav-link', { active })} data-toggle="tab" role="tab">
        {label}
      </a>
    </li>
  )
}

export default Tab
