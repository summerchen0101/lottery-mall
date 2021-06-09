import React, { useMemo } from 'react'
import RouteTabGroup from './RouteTabGroup'

export default function RecPageTabs() {
  const options = useMemo(
    () => [
      { label: '下单记录', value: '/bet-rec' },
      { label: '结帐纪录', value: '/opened-rec' },
      { label: '大盘走势', value: '/rank' },
    ],
    [],
  )
  return <RouteTabGroup options={options} />
}
