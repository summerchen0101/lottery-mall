import { useRouter } from 'next/dist/client/router'
import React, { ReactNode } from 'react'

const HeaderTitleBar: React.FC<{
  title?: ReactNode
  extra?: ReactNode
  back?: boolean
  backPath?: string
}> = ({ back, backPath, title, extra }) => {
  const router = useRouter()
  return (
    <nav className="main_nav">
      <div className="nav-bar">
        <a
          hidden={!back}
          className="left-item"
          onClick={() => (backPath ? router.push(backPath) : router.back())}
        >
          <i className="iconfont iconallow-left"></i>
        </a>
        <div className="nav-title">{title}</div>
        {/* <div class="right-item"><a class="s-btn">删除</a><a class="s-btn">取消</a></div> */}
        <div className="right-item">{extra}</div>
      </div>
    </nav>
  )
}

export default HeaderTitleBar
