const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    //前台项目在发起请求的时候，若请求的路劲带有/api，那么代理服务器就开始转发给真实服务器索要数据
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        //路径不需要重写。这一步是处理请求路径跟真实服务器上的路劲不一致，做一个映射
        // pathRewrite:{'^/api',''}
      }
    }
  }
})
