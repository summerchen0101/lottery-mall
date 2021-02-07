import { NewsType } from './enums'
import bankCodes from './bankCodes'

export const bankCodeOpts = bankCodes.map((t) => ({
  label: `${t.name}(${t.code})`,
  value: t.code,
}))

export const dateOpts = [
  { label: '今日', value: 'today' },
  { label: '昨日', value: 'yesterday' },
  { label: '本週', value: 'thisWeek' },
  { label: '上週', value: 'lastWeek' },
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' },
]

export const beforeDateRangeOpts = [
  { label: '本週', value: 1 },
  { label: '上週', value: 2 },
  { label: '本月', value: 3 },
  { label: '上月', value: 4 },
]
export const afterDateRangeOpts = [
  { label: '今日', value: 1 },
  { label: '明日', value: 2 },
  { label: '本週', value: 3 },
  { label: '下週', value: 4 },
]

export const newsTypeOpts = [
  { label: '系統通知', value: NewsType.System },
  { label: '賽事公告', value: NewsType.Game },
  { label: '活動優惠', value: NewsType.Activity },
]
