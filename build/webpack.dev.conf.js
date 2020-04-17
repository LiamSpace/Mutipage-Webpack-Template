/** create at 2020-04-15
 *  liam
 */
const path = require('path')
const Webpack = require('webpack')
const webpackBaseConf = require('./webpack.base.conf')
const webpackMerge = require('webpack-merge')

const webpackConfigDev = {
    mode:'development',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'./js/[name].[hash:8].js'
    },
    devServer:{
        index:'main.html',
        contentBase: path.resolve(__dirname,'../src'),
        publicPath:'/', //以src为根目录
        host: 'localhost',
        port: "8085",
        overlay: true, //浏览器页面上显示错误,
        open: true, //自动打开浏览器
        stats: 'errors-only',//只打印错误信息,
        hot: true, //开启热更新
        proxy:{
            '/api':{
                target:'http://www.baidu.com',
                secure: true,
                changeOrigin: true //跨域
            }
        }
    },
    plugins:[
        //热更新
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin()
    ],
    devtool: "source-map" //开启调试模式
}

module.exports = webpackMerge(webpackBaseConf,webpackConfigDev)
