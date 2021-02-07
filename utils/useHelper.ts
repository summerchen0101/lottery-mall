import moment from 'moment'

const useHelper = () => {
  function getBase64(file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  const copyToClipboard = (text) => {
    const input = document.body.appendChild(document.createElement('input'))
    input.value = text
    input.focus()
    input.select()
    document.execCommand('copy')
    input.parentNode.removeChild(input)
  }
  return { getBase64, copyToClipboard }
}

export default useHelper
