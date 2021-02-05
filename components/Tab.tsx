import React from 'react'
import cs from 'classnames'
import { Box, BoxProps } from '@chakra-ui/layout'
const Tab: React.FC<
  {
    active?: boolean
    label: string
  } & BoxProps
> = ({ active, label, ...props }) => {
  return (
    <Box className="nav-item" {...props}>
      <a className={cs('nav-link', { active })} data-toggle="tab" role="tab">
        {label}
      </a>
    </Box>
  )
}

export default Tab
