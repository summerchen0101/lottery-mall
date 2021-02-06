import moment from 'moment'

const useHelper = () => {
  const createAutoNums = (count: number = 5, max: number = 39): number[] => {
    const setNums = new Set(
      [...Array(count)].map((t) => Math.ceil(Math.random() * max)),
    )
    const nums = Array.from(setNums)
    if (nums.length < count) {
      return createAutoNums()
    }
    return nums
  }
  const createDateOpts = (startDate?: any) => {
    return [...Array(30)]
      .map((_, i) => {
        return moment(startDate).add(i, 'day')
      })
      .filter((m) => m.format('dddd') !== 'Sunday')
  }

  const copyToClipboard = (text) => {
    const input = document.body.appendChild(document.createElement('input'))
    input.value = text
    input.focus()
    input.select()
    document.execCommand('copy')
    input.parentNode.removeChild(input)
  }
  return { createAutoNums, createDateOpts, copyToClipboard }
}

export default useHelper
