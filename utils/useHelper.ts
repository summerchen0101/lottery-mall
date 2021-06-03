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

  const jsonEncode = function <T extends {}>(obj: T) {
    return obj && Buffer.from(JSON.stringify(obj)).toString('base64')
  }

  const jsonDecode = function <R>(str: string) {
    return str && (JSON.parse(Buffer.from(str, 'base64').toString()) as R)
  }

  return { getBase64, secToTimer, toNumString, jsonEncode, jsonDecode }
}

export default useHelper
