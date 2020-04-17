/** create at 2020-04-15
 *  liam
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const rules =  require('./webpack.rules.conf');

const copyWebpackPlugin = require('copy-webpack-plugin'); //copy静态资源
const purifyCssWebpack = require('purifycss-webpack');//消除冗余css
const htmlWebpackPlugin = require('html-webpack-plugin');//组装html模版
/** create at 2020-04-15
 *  获取全部入口
 */
function getEntry(){
    let entry = {};
    glob.sync('./src/pages/**/*.js')
        .forEach(function(name){
            let start = name.indexOf('src/') + 4
            let end = name.length - 3;
            let nameValue = [];
            let tagName = name.slice(start,end);
            tagName = tagName.slice(0,tagName.lastIndexOf('/')); //key值
            tagName = tagName.split('/')[1];
            nameValue.push(name);
            // 'pages/xxx': [path]
            entry[tagName] = nameValue;
        })
    return entry;
};
/** create at 2020-04-16
 *  简化路径
 */
function resolve(dir){
    return path.resolve(__dirname,'..',dir);
}

module.exports = {
    entry: getEntry(),
    module: {
        rules:[...rules]
    },
    resolve: {
        alias: {
            '@':resolve('src')
        }
    },
    //提取公共代码，打包三方库
    optimization: {
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /node_modules/,   //指定目录
                    chunks: 'initial',
                    name: 'vendor', //打包名
                    priority: 10 //优先级,以防被自定义公共代码提取覆盖
                }
            }
        }
    },
    plugins: [
        new copyWebpackPlugin([{
            from: resolve('src/statics'),
            to: './statics',
            ignore: ['.*']
        }]),
        //消除冗余css代码
        new purifyCssWebpack({
            paths: glob.sync(resolve("src/pages/*/*.html"))
        }),
        //设置插件
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:'jquery'
        })
    ]
}

//页面搭建配置
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        chunks: ['vendor', element]
    })
});

//自动生成html模版
htmlArray.forEach((element) => {
    module.exports.plugins.push(
        new htmlWebpackPlugin(getHtmlConfig(element._html,element.chunks))
    )
});

//组合页面参数
function getHtmlConfig(name,chunks){
    return {
        template: `./src/pages/${name}/index.ejs`,
        filename: `${name}.html`,
        inject: true,
        hash: true,
        chunks: chunks,
        minify: process.env.NODE_ENV === 'development' ? false : {
            removeComments: true, //移除html当中注释
            collapseWhitespace: true, //消除空格
            removeAttributeQuotes: true //去除属性引用
        }
    }
}
