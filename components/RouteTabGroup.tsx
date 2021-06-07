import { OptionType } from '@/lib/types'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Tab from './Tab'
import TabGroup from './TabGroup'

function RouteTabGroup({ options }: { options: OptionType<string>[] }) {
  const router = useRouter()
  return (
    <TabGroup justifyContent="space-between">
      {options.map((t, i) => (
        <Tab
          key={i}
          active={t.value === router.pathname}
          onClick={() => router.push(t.value)}
        >
          {t.label}
        </Tab>
      ))}
    </TabGroup>
  )
}

export default RouteTabGroup
