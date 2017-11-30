module.exports = {
  /*runtimeConfig: {
    experimentalFeatures: {
      featureFoo: false,
      featureBar: true
    },

    thirdPartyApiKey: 'Ed9OLi#$27nbV'
  },*/

  publicPath: '/assets/',

  devServer: {
    host: 'localhost',
    port: 8282,
    proxy: {
      '/api/v1/': {
        target: 'http://localhost:16000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }/*,

      '/api/pay/': {
        target: 'http://pay.example.dev',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }*/
    }
  }
}
