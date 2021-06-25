module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
  images: {
    domains: [
      'test.thlin168.com',
      'mall.thlin168.com',
      'mall-api.ms5149514.com',
      'api.shop-pro.cc',
      'shop-pro.cc',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ]
  },
}
