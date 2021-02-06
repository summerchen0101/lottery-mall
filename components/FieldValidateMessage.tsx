import React from 'react'
import { FieldError } from 'react-hook-form/dist/types'

const FieldValidateMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) return <></>
  return (
    <small className="text-red">
      <i className="iconfont iconerror mr-1"></i>
      {error.message}
    </small>
  )
}

export default FieldValidateMessage
