const webpack = require("webpack");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/modal/' : '/modal/',  //资源路径
    outputDir: 'dist',  //打包生产的目录
    //    assetsDir:'',  //放置生成的静态资源 (js、css、img、fonts) 的目录
    devServer: {
        host: '',
        port: '',
        proxy: {
            '/api': {
                target: 'https://m.ixuechuang.com/', // 代理目标的基础路径
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 支持跨域
                // pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                //     '^/api': ''
                // }
            },
            '/map': {
                target: 'https://apis.map.qq.com/', // 代理目标的基础路径
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/map': ''
                }
            }
        }
    },
    parallel: false,
    chainWebpack: config => {
        config.optimization.minimize(true);  //js最小化处理
        config.optimization.splitChunks({   //分割代码
            chunks: 'all'
        });
        // //压缩图片
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()

    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ],
        // externals: {
        //     'AMap': 'AMap' // 高德地图配置
        // }
    },

    productionSourceMap: false  //生产环境不生成source map
}