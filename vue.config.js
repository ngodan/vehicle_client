const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "fs": false
      }
    }
  }
})
