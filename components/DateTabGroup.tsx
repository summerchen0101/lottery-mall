import { DateRangeType } from '@/lib/enums'
import { OptionType } from '@/lib/types'
import React, { useState } from 'react'
import Tab from './Tab'
import TabGroup from './TabGroup'

function DateTabGroup({ options }: { options: OptionType<DateRangeType>[] }) {
  const [current, setCurrent] = useState(DateRangeType.Today)
  return (
    <TabGroup justifyContent="space-between">
      {options.map((t, i) => (
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
