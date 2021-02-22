import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Box, Image, InputProps, Stack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const ImageUpload: React.FC<{
  onChange?: (dataUrl: string) => void
  value?: string
  register: any
}> = ({ onChange, value, register }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const { getBase64 } = useHelper()
  useEffect(() => {
    setImageUrl(value)
  }, [value])
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e.target.files[0]
    if (!file) {
      setImageUrl('')
      return
    }
    const imgUrl = await getBase64(file)
    setImageUrl(imgUrl)
    onChange && onChange(imgUrl)
    setLoading(false)
  }

  return (
    <Box className="form-upload mb-1">
      {imageUrl ? (
        <Image src={imageUrl} />
      ) : (
        <button type="button" className="text-area">
          <i className="iconfont iconadd" />
          <span className="text-lighgray">
            支持扩展名 .png .jpg
            <br />
            （圖片最大上傳檔案大小：2 MB)
          </span>
        </button>
      )}

      <input
        ref={register({ required: '不可為空' })}
        className="upload"
        type="file"
        name="img"
        onChange={handleChange}
      />
    </Box>
  )
}

export default ImageUpload
