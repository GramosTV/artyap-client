const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'http://localhost:8000'
    },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/_variables.scss";`,
        additionalData: `@import "@/assets/global.scss";`
      }
    }
  }
})
