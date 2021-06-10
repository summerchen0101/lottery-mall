import { useToast } from '@chakra-ui/toast'
import React, { ReactNode } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
export default function TextCopy({
  text,
  children,
}: {
  text: string | number
  children: ReactNode
}) {
  const toast = useToast()
  return (
    <CopyToClipboard
      text={text?.toString()}
      onCopy={(text) =>
        toast({
          duration: 2000,
          status: 'success',
          title: '已复制至剪贴簿',
        })
      }
    >
      {children}
    </CopyToClipboard>
  )
}
