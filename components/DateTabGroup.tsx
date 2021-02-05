import { beforeDateRangeOpts } from '@/lib/options'
import React, { useState } from 'react'
import Tab from './Tab'
import TabGroup from './TabGroup'

function DateTabGroup() {
  const [current, setCurrent] = useState(1)
  return (
    <TabGroup justifyContent="space-between">
      {beforeDateRangeOpts.map((t, i) => (
        <Tab
          key={i}
          label={t.label}
          active={t.value === current}
          onClick={() => setCurrent(t.value)}
        />
      ))}
    </TabGroup>
  )
}

export default DateTabGroup
