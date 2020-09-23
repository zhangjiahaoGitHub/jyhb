// 作为配置文件，直接导出配置对象即可
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    outputDir: 'dist',
    //关闭esLint
    lintOnSave: false,
    indexPath:'index.html',
    publicPath:process.env.NODE_ENV === 'production'? './': '/',
    configureWebpack: {
      externals: {
        AMap: "AMap",
      },
    },
    // pages:{ type:Object,Default:undfind } 
    devServer: {
        // port: 8080, // 端口号
        // host: 'localhost',
        // https: false, // https:{type:Boolean}
        // open: false, //配置自动启动浏览器
        proxy: {
            '/apis': {
                target: 'http://jyhbban.llyzf.cn/lly-posp-proxy/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''  // rewrite path
                }
            },
        },  // 配置多个代理
    },
    configureWebpack:process.env.NODE_ENV === 'production'? 
      {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {
                  drop_console: true,
                  drop_debugger: false,
                  pure_funcs: ['console.log'] // 移除console
                }
              },
            })
          ]
        }
      }
      :{}
}