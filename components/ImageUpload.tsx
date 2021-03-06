import useHelper from '@/utils/useHelper'
import { Box, Image, Input, InputProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface ImageUploadProps {
  onChange?: (dataUrl: string) => void
}

const ImageUpload = function (
  { onChange, defaultValue, ...props }: ImageUploadProps & InputProps,
  ref,
) {
  const [imageUrl, setImageUrl] = useState('')
  const { getBase64 } = useHelper()
  useEffect(() => {
    setImageUrl(defaultValue as string)
  }, [defaultValue])
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    if (!file) {
      setImageUrl('')
      return
    }
    const imgUrl = await getBase64(file)
    setImageUrl(imgUrl)
    onChange && onChange(imgUrl)
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
            {'（圖片最大上傳檔案大小：2 MB)'}
          </span>
        </button>
      )}

      <Input
        className="upload"
        type="file"
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    </Box>
  )
}

export default React.forwardRef(ImageUpload)
