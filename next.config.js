module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
  images: {
    domains: [process.env.SITE_DOMAIN],
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
