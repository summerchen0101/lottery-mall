import React from 'react'
import Link from 'next/link'
import cs from 'classnames'
import { useRouter } from 'next/dist/client/router'

const ActiveLink: React.FC<{ label: string; href: string }> = ({
  label,
  href,
}) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <a className={cs({ active: router.pathname === href })}>{label}</a>
    </Link>
  )
}

export default ActiveLink
