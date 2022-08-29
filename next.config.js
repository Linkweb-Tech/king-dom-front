const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  images: {
    loader: 'imgix',
    path: '/',
  },
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
