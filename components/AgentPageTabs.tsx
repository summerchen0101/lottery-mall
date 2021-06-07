import React, { useMemo } from 'react'
import RouteTabGroup from './RouteTabGroup'

export default function AgentPageTabs() {
  const options = useMemo(
    () => [
      { label: '新增用户', value: '/agent/member-create' },
      { label: '生成链结', value: '/agent/link-generator' },
      { label: '链结管理', value: '/agent/link-manage' },
    ],
    [],
  )
  return <RouteTabGroup options={options} />
}
