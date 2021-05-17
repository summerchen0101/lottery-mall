module.exports = {
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
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
