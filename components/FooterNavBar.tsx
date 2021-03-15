import React from 'react'
import ActiveLink from './ActiveLink'

const FooterNavBar: React.FC = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-list-item market">
          <ActiveLink href="/events" label="市场" />
        </li>
        <li className="footer-list-item detail">
          <ActiveLink href="/bet-record" label="纪录" />
        </li>
        <li className="footer-list-item index">
          <ActiveLink href="/home" label="首页" />
        </li>
        <li className="footer-list-item history">
          <ActiveLink href="/history" label="历史" />
        </li>
        <li className="footer-list-item my">
          <ActiveLink href="/my" label="我的" />
        </li>
      </ul>
    </div>
  )
}

export default FooterNavBar
