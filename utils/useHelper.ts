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
  return { createAutoNums, createDateOpts }
}

export default useHelper
