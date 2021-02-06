import React from 'react'
import { FieldError } from 'react-hook-form/dist/types'

const FieldValidateMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) return <></>
  return <span className="text-danger">{error.message}</span>
}

export default FieldValidateMessage
