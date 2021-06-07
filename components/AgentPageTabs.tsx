import React, { useMemo } from 'react'
import RouteTabGroup from './RouteTabGroup'

export default function AgentPageTabs() {
  const options = useMemo(
    () => [
      { label: '新增用户', value: '/agent/create' },
      { label: '生成链结', value: '/agent' },
      { label: '链结管理', value: '/agent' },
    ],
    [],
  )
  return <RouteTabGroup options={options} />
}
