import { DateRangeType } from '@/lib/enums'
import moment, { Moment } from 'moment'
import { useMemo } from 'react'

function useDateRange(dateType: DateRangeType) {
  const dateRanges = useMemo<Record<DateRangeType, [Moment, Moment]>>(() => {
    return {
      [DateRangeType.Today]: [moment().startOf('day'), moment().endOf('day')],
      [DateRangeType.Yesterday]: [
        moment().subtract(1, 'day').startOf('day'),
        moment().subtract(1, 'day').endOf('day'),
      ],
      [DateRangeType.Tomorrow]: [
        moment().add(1, 'day').startOf('day'),
        moment().add(1, 'day').endOf('day'),
      ],
      [DateRangeType.ThisWeek]: [
        moment().startOf('week'),
        moment().endOf('week'),
      ],
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
    }
  }, [])

  return dateRanges[dateType]
}

export default useDateRange
