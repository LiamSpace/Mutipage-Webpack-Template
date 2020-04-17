/** create at 2020-04-15
 *  liam
 */
const path = require('path');
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');


module.exports = merge(webpackConfigBase,{
    mode: 'production',                     // 通过 mode 声明生产环境
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].[hash:8].js',
        publicPath: './'
    },
    devtool: 'cheap-module-eval-source-map', //不生成映射文件，定位出错的行
    plugins: [
        //删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true,                    //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        // 分离css插件参数为提取出去的路径
        new extractTextPlugin({
            filename: 'css/[name].[hash:8].min.css',
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    drop_debugger: false,
                    drop_console: true
                }
            }
        })
    ],
    module: {
        rules: []
    },
})
