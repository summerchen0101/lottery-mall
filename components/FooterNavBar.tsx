import React from 'react'
import ActiveLink from './ActiveLink'

const FooterNavBar: React.FC = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-list-item market">
          <ActiveLink href="/market" label="市場" />
        </li>
        <li className="footer-list-item detail">
          <ActiveLink href="/bettings" label="明细" />
        </li>
        <li className="footer-list-item index">
          <ActiveLink href="/" label="首页" />
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
