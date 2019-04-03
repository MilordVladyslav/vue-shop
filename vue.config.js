// var webpack = require('webpack')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       noUiSlider: 'nouislider'
  //     })
  //   ]
  // }
}
