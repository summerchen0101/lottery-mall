import moment from 'moment'
import $ from 'jquery'
import { useToast } from '@chakra-ui/toast'
import numeral from 'numeral'

const useHelper = () => {
  const toast = useToast()
  function getBase64(file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  const secToTimer = (seconds: number) =>
    seconds ? new Date(seconds * 1000).toISOString().substr(14, 5) : ''

  const toNumString = (value?: number, num = 3) =>
    value?.toString().padStart(num, '0')

  return { getBase64, secToTimer, toNumString }
}

export default useHelper
