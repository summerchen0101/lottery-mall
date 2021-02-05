import Head from 'next/head'
import React from 'react'

const MetaHead = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>MS反波膽</title>
      <meta name="description" content="" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
      />
      <link rel=" stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
      <link rel="stylesheet" href="/css/main.css" />
      <link rel="stylesheet" href="/fonts/iconfont.css" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/images/favicon.ico"
      />
      <script src="/js/jquery-3.5.1.min.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/js/swiper-bundle.min.js"></script>
      {/* <script src="/js/main.js"></script>
      <script src="/js/echarts.min.js"></script> */}
    </Head>
  )
}

export default MetaHead
