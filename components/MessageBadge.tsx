import { useRouter } from 'next/dist/client/router'
import React from 'react'

function MessageBadge() {
  const router = useRouter()
  return (
    <>
      <i
        className="iconfont iconmail"
        onClick={() => router.push('/message')}
      />
      {/* <span className="red-dot" /> */}
    </>
  )
}

export default MessageBadge
