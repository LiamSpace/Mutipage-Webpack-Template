/** create at 2020-04-15
 *  liam
 */
const path =require('path');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin =  require("extract-text-webpack-plugin");
const rules = [
    {
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader",
            { loader: "postcss-loader",
                options: {
                    plugins:
                        [autoprefixer({
                            overrideBrowserslist: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version'],
                            remove: true
                        })],
                    sourceMap:true
                }
            }] : ExtractTextPlugin.extract({
            fallback: "style-loader",
            // use: ["css-loader", "sass-loader", "postcss-loader"],
            use: [
                // {
                //     loader: 'css-loader',
                //     options: {
                //         minimize: true,
                //         '-autoprefixer': true
                //     }
                // },
                "css-loader",
                "sass-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        plugins:
                            [autoprefixer({
                                overrideBrowserslist: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version'],
                                remove: true
                            })],
                        sourceMap:true
                    }
                }
            ],
            // css中的基础路径
            publicPath: "./css"
        })
    },
    {
        test: /\.js$/,
        use: ["babel-loader"],
        // 不检查node_modules下的js文件
        exclude: "/node_modules/"
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i, //图片文件
        use: [
            {
                //url 转换成base64 ,超过限制使用file-loader
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    },
                    //启用CommonJS模版语法
                    esModule: false
                },
            }
        ],
        include:[path.resolve(__dirname,"../src/assets/")],
        exclude:/node_modules/
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                    esModule: false
                },

            }
        ],
        include:[path.resolve(__dirname,"../src/assets/")],
        exclude:/node_modules/
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]'
                        }
                    }
                }
            }
        ],
        include:[path.resolve(__dirname,"../src/assets/")],
        exclude:/node_modules/
    },
    {
        test: /\.(html|ejs)$/,
        // html中的img标签
        use: ["html-withimg-loader"]
    },
    {
        test: /\.ejs$/,
        use:['ejs-html-loader'],
        include: path.resolve(__dirname,'../src')
    }
]

module.exports = rules;



