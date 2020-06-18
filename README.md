### Webpack 多页面脚手架

---

#### 使用场景：适用于企业官网、博客等多页面应用

#### webpack 版本：webpack4

####实现功能：

> - Eslint 语法检查
> - Ejs 模版语法
> - CSS 预编译—Sass
> - 静态资源目录（static【直接 copy 打包】、assets【图片、视频】）
> - 热更新服务器
> - 自带 Jquery 模块
> - 支持 es6 语法
> - npm 包管理工具
> - 兼容 ie8 以上、IOS7 以上浏览器

#### 使用

```git
$ git clone git@github.com:LiamSpace/mutipage-webpack-template.git your-app-name

$ cd your-app-name

$ git remote set-url origin your-git-url // 修改远程仓库地址

$ npm install

$ npm run dev #运行项目

$ npm run build #打包项目

```

#### 目录结构：

````bash
​```
.
├── README.md
├── build
│   ├── webpack.base.conf.js #webpack基础配置
│   ├── webpack.dev.conf.js #开发环境
│   ├── webpack.prod.conf.js #生成环境
│   └── webpack.rules.conf.js	#rules
├── dist #打包文件
│   ├── css
│   │   └── main.5dc77d00.min.css
│   ├── img
│   │   └── shopLogo.4d002569.png
│   ├── js
│   │   └── main.5dc77d00.js
│   ├── main.html
│   └── statics
│       └── write.gif
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── assets #资源文件
│   │   ├── fonts #存放字体文件
│   │   ├── images	#存放图片文件
│   │   │   ├── logo.ico
│   │   │   └── shopLogo.png
│   │   └── video #存放视频文件
│   ├── components #页面公用部分
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── pages	#页面部分
│   │   └── main
│   │       ├── index.ejs
│   │       ├── index.js
│   │       └── index.scss
│   ├── statics	#静态资源 直接copy到打包文件
│   │   └── write.gif
│   ├── styles #通用样式
│   └── utils	#功能函数
│       └── test.js
└──
​```
````

```bash
* 项目在npm install时，会出现报错，并不会影响项目正常运行。原因是: 查看自己的node版本是否过新，新的node版本会报错。
```

作者 [@LiamSpace][3]
2020 年 04 月 17 日
