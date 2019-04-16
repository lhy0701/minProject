    |-- 车企典 小程序
        |-- .babelrc
        |-- .editorconfig
        |-- .gitignore
        |-- .postcssrc.js
        |-- carbrother.zip
        |-- directoryList.md
        |-- index.html
        |-- package.json
        |-- package.swan.json
        |-- project.config.json
        |-- project.swan.json
        |-- README.md
        |-- build                                     // mpvue 打包配置
        |   |-- build.js
        |   |-- check-versions.js
        |   |-- dev-client.js
        |   |-- dev-server.js
        |   |-- utils.js
        |   |-- vue-loader.conf.js
        |   |-- webpack.base.conf.js                  // 默认配置
        |   |-- webpack.dev.conf.js                   // 开发配置
        |   |-- webpack.prod.conf.js                  // 生产配置
        |-- config
        |   |-- index.js
        |   |-- prod.env.js
        |-- dist                                      // 打包后的文件 均为自动打包
        |   |-- wx
        |       |-- pages
        |       |   |-- images                          ****   不在打包范围   ****
        |       |   |   |-- back_you_two_img.png
        |       |   |   |-- in_result_error_img.png
        |       |   |-- inputPrice                      ****   不在打包范围   ****
        |       |   |   |-- inputPrice.js
        |       |   |   |-- inputPrice.json
        |       |   |   |-- inputPrice.wxml
        |       |   |   |-- inputPrice.wxss
        |       |   |-- record                          ****   不在打包范围   ****
        |       |   |   |-- record.js
        |       |   |   |-- record.json
        |       |   |   |-- record.wxml
        |       |   |   |-- record.wxss
        |       |   |-- showQr                          ****   不在打包范围   ****
        |       |       |-- showQr.js
        |       |       |-- showQr.json
        |       |       |-- showQr.wxml
        |       |       |-- showQr.wxss
        |       |-- static
        |       |   |-- images
        |       |   |   |-- background.png
        |       |   |   |-- user.png
        |       |   |-- iviewWabapp
        |       |   |   |-- action-sheet
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- base
        |       |   |   |   |-- index.js
        |       |   |   |-- button
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- cell
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- cell-group
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |-- grid
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- grid-icon
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- grid-item
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- grid-label
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- icon
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- message
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- modal
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- notice-bar
        |       |   |   |   |-- index.js
        |       |   |   |   |-- index.json
        |       |   |   |   |-- index.wxml
        |       |   |   |   |-- index.wxss
        |       |   |   |-- panel
        |       |   |       |-- index.js
        |       |   |       |-- index.json
        |       |   |       |-- index.wxml
        |       |   |       |-- index.wxss
        |       |   |-- tabs
        |       |       |-- home-active.png
        |       |       |-- home.png
        |       |       |-- orders-active.png
        |       |       |-- orders.png
        |       |-- utils
        |           |-- create_qr.js
        |           |-- util.js
        |-- src
        |   |-- app.json
        |   |-- App.vue
        |   |-- main.js
        |   |-- api
        |   |   |-- config.js
        |   |   |-- index.js
        |   |   |-- interface
        |   |       |-- bankList.js
        |   |-- components
        |   |   |-- card.vue
        |   |-- config
        |   |   |-- host.js
        |   |-- mock
        |   |   |-- userinfo.json
        |   |-- pages
        |   |   |-- account
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- bankCard
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- detail
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- enterMobilePhoneNumber
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- index
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |-- information
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- inputVerificationCode
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- login
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- logs
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- result
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- searchBank
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- setThePassword
        |   |   |   |-- index.vue
        |   |   |   |-- main.js
        |   |   |   |-- main.json
        |   |   |-- showQr
        |   |       |-- showQr.js
        |   |       |-- showQr.json
        |   |       |-- showQr.wxml
        |   |       |-- showQr.wxss
        |   |-- utils
        |       |-- create_qr.js
        |       |-- DateString.js
        |       |-- encrypt.js
        |       |-- index.js
        |       |-- util.js
        |-- static
            |-- .gitkeep
            |-- images
            |   |-- background.png
            |   |-- user.png
            |-- iviewWabapp
            |   |-- action-sheet
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- base
            |   |   |-- index.js
            |   |-- button
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- cell
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- cell-group
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |-- grid
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- grid-icon
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- grid-item
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- grid-label
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- icon
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- message
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- modal
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- notice-bar
            |   |   |-- index.js
            |   |   |-- index.json
            |   |   |-- index.wxml
            |   |   |-- index.wxss
            |   |-- panel
            |       |-- index.js
            |       |-- index.json
            |       |-- index.wxml
            |       |-- index.wxss
            |-- tabs
                |-- home-active.png
                |-- home.png
                |-- orders-active.png
                |-- orders.png
