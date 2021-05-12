import { OptionType } from '@/lib/types'
import moment from 'moment'
import numeral from 'numeral'
import { useCallback } from 'react'

const useTransfer = () => {
  const toDateTime = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD HH:mm:ss')
  const toDate = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD')
  const isBeforeDay = (unixTime: number) =>
    moment(unixTime * 1000).isBefore(moment(), 'day')

  const toCurrency = (num: number, decimal: number = 2) =>
    numeral(num).format(
      decimal ? `0,0.${Array(decimal).fill('0').join('')}` : '0,0',
    )

  const toOptionName = function <T extends string | number>(
    options: OptionType<T>[],
    code: number | string,
  ): string {
    return options.find((t) => t.value === code)?.label
  }

  const htmldecode = function (s: string) {
    if (!s) return
    const div = document.createElement('div')
    div.innerHTML = s
    return div.innerText || div.textContent
  }

  return {
    toDate,
    toDateTime,
    isBeforeDay,
    toCurrency,
    toOptionName,
    htmldecode,
  }
}

export default useTransfer
