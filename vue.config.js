// const ServiceConfig  = require("./src/service/serviceConfig.ts");

module.exports = {
  // 是否生成map文件
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    open: true,
    port: 8088,
    // 允许内网穿透
    disableHostCheck: true,
    proxy: {
      "/api": {
        // target: process.env.NODE_ENV == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl,
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
}