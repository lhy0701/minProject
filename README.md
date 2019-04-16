## 车企典微信小程序

#### appid
     wx01d61ed9e239a396

## 微信小程序接口地址

      测试地址  http://192.168.1.138:9001  路径： /ERPService.svc/DoService

      生产地址  https://admin.chexd.com  路径： /backends/ERPService.svc/DoService


### 设置请求地址

  手动配置了一个环境标识, 所以在 **webpack.dev.conf.js** 和 **webpack.prod.conf**  自定义了 [[TYPE_ENV]] 的环境属性

webpack.dev.conf.js

          //...
          new webpack.DefinePlugin({
            'process.env': config.dev.env,
            'process.TYPE_ENV': JSON.stringify('dev') // dev
          }),
          //...

  webpack.prod.conf

        // ...
        new webpack.DefinePlugin({
          'process.env': env,
          'process.TYPE_ENV': JSON.stringify('production') // production
        }),
        //...

``` bash

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build
将 jie-page.zip 中的 copy-dist 目录中文件 复制到 dist/wx/pages
将 jie-page.zip 中的 copy-dist-utils 目录中文件 复制到 dist/wx/utils

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

## 项目结构
    |-- 车企典
        |-- .babelrc
        |-- .editorconfig
        |-- .gitignore
        |-- .postcssrc.js
        |-- index.html
        |-- package.json
        |-- package.swan.json
        |-- project.config.json
        |-- project.swan.json
        |-- README.md
        |-- build                              // 项目打包配置
        |-- config                             // 开发环境配置
        |-- dist                               // 打包后目录 （其他均为脚手架自动打包）
        |   |-- wx
        |       |-- pages
        |       |   |-- images                 // 安卓混合的页面，脚手架不会自动打包，所以打包到dist时，手动将文件从 jie-page.zip/copy-dist 复制到 /dist/wx/pages
        |       |   |-- inputPrice             // 安卓混合的页面，脚手架不会自动打包，所以打包到dist时，手动将文件从 jie-page.zip/copy-dist 复制到 /dist/wx/pages
        |       |   |-- record                 // 安卓混合的页面，脚手架不会自动打包，所以打包到dist时，手动将文件从 jie-page.zip/copy-dist 复制到 /dist/wx/pages
        |       |   |-- showQr                 // 安卓混合的页面，脚手架不会自动打包，所以打包到dist时，手动将文件从 jie-page.zip/copy-dist 复制到 /dist/wx/pages
        |       |   |-- tabs
        |       |-- utils                      // 安卓混合的js，jie-page.zip/copy-dist- 复制 /dist/wx/utils
        |           |-- create_qr.js
        |           |-- index.js
        |           |-- util.js
        |-- src
        |   |-- app.json
        |   |-- App.vue                       // 入口 vue
        |   |-- main.js                       // 入口文件
        |   |-- api                           // fly请求封装
        |   |-- components                    // 公共组件(暂未封装)
        |   |-- config                        // 根据环境，修改请求地址
        |   |-- pages                         // 页面目录
        |   |   |-- account                       // 对公入账信息
        |   |   |-- bankCard                      // 银行卡信息
        |   |   |-- index                         //
        |   |   |-- information                   // 注册商户信息
        |   |   |-- login                         // 登录
        |   |   |-- logs                          // 日志
        |   |   |-- result                        // 注册结果
        |   |   |-- searchBank                    // 选择开户行支行
        |   |   |-- enterMobilePhoneNumber        // 注册/修改密码 - 输入手机号码
        |   |   |-- inputVerificationCode         // 注册/修改密码 - 输入验证码
        |   |   |-- setThePassword                // 注册/修改密码 - 重置密码
        |   |-- utils
        |-- static
            |-- .gitkeep
            |-- images
            |   |-- background.png
            |   |-- user.png
            |-- iviewWabapp
            |   |-- action-sheet
            |   |-- base
            |   |-- button
            |   |-- cell
            |   |-- cell-group
            |   |-- icon
            |   |-- message
            |   |-- notice-bar
            |   |-- panel
            |-- tabs
                |-- home-active.png
                |-- home.png
                |-- orders-active.png
                |-- orders.png
