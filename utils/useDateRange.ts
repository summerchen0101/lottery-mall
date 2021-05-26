import { DateRangeType } from '@/lib/enums'
import moment, { Moment } from 'moment'
import { useMemo, useState } from 'react'

const dateRanges = {
  [DateRangeType.Today]: [moment().startOf('day'), moment().endOf('day')],
  [DateRangeType.Yesterday]: [
    moment().subtract(1, 'day').startOf('day'),
    moment().subtract(1, 'day').endOf('day'),
  ],
  [DateRangeType.Tomorrow]: [
    moment().add(1, 'day').startOf('day'),
    moment().add(1, 'day').endOf('day'),
  ],
  [DateRangeType.ThisWeek]: [moment().startOf('week'), moment().endOf('week')],
  [DateRangeType.LastWeek]: [
    moment().subtract(1, 'week').startOf('week'),
    moment().subtract(1, 'week').endOf('week'),
  ],
  [DateRangeType.ThisMonth]: [
    moment().startOf('month'),
    moment().endOf('month'),
  ],
  [DateRangeType.LastMonth]: [
    moment().subtract(1, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month'),
  ],
  [DateRangeType.inYear]: [moment().subtract(1, 'year'), moment()],
}

function useDateRange(dateType: DateRangeType | null) {
  return dateType && dateRanges[dateType]
}

export default useDateRange
