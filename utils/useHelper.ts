import moment from 'moment'
import $ from 'jquery'
import { useToast } from '@chakra-ui/toast'

const useHelper = () => {
  const toast = useToast()
  function getBase64(file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({ status: 'success', title: '已复制至剪贴簿' })
  }

  const closeBottomPopup = () => {
    $('.mask').fadeOut()
    $('.slide-up-section').removeClass('slide-up')
  }

  return { getBase64, copyToClipboard, closeBottomPopup }
}

export default useHelper
