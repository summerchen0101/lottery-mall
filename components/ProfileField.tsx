import { Box } from '@chakra-ui/layout'
import cs from 'classnames'
import React, { ReactNode } from 'react'

type ProfileFieldProps = {
  label: string
  children: ReactNode
  code: string
}
function ProfileField({ label, children, code }: ProfileFieldProps) {
  return (
    <Box as="li" className={cs('col-list-item section-padding pointer', code)}>
      {label}
      <span className="item-title text-right">{children}</span>
      <i className="iconfont iconallow-right" />
    </Box>
  )
}

export default ProfileField
