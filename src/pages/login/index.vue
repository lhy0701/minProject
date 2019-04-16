
<template>
  <div>
    <img class="background" src="../../../static/images/background.png" alt="">
    <div class="title" style="margin:90rpx;">
      <div class="login-phone" v-bind:class="{ active: isActive }" v-on:click="switchTab(0)">手机快捷登录</div>
      <div
        class="login-normal"
        v-bind:class="{ active: !isActive }"
        v-on:click="switchTab(1)"
      >账号密码登录</div>
    </div>
    <div class="login-form">
      <!-- 账号密码 -->
      <form class="form-container" v-show="isActive">
        <label for="">
          <i-icon class="login-icon" type="mobilephone" size="28" color="#80848f"/>
          <input
            type="text"
            class="form-control"
            v-model.trim="userInfo.Mobile"
            placeholder="请输入手机号码"
            maxlength="11"
          >
        </label>
        <label for="">
          <i-icon class="login-icon" type="lock" size="28" color="#80848f"/>
          <input
            type="password"
            class="form-control"
            v-model.trim="userInfo.LoginPwd"
            placeholder="请输入密码"
            maxlength="16"
          >
        </label>
      </form>
      <!-- 账号验证码 -->
      <form class="form-container" v-show="!isActive">
        <label for="">
          <i-icon class="login-icon" type="mobilephone" size="28" color="#80848f"/>
          <input
            type="text"
            class="form-control"
            v-model.trim="userInfo.Mobile"
            placeholder="请输入手机号码"
            maxlength="11"
          >
        </label>
        <label for="">
          <i-icon class="login-icon" type="prompt" size="28" color="#80848f"/>
          <input
            type="text"
            class="form-control"
            v-model.trim="userInfo.MsgCodes"
            placeholder="请输入验证码"
            maxlength="6"
          >
          <button
            class="obtain"
            :class="{disable: isClick}"
            :disabled="isClick"
            @click="intervalTime"
          >{{codeContent}}</button>
        </label>
      </form>
      <div class="forget">
        <span @click="operate('4')">忘记密码</span>
        <span @click="operate('5')">新用户注册</span>
      </div>
      <button @click="getResult">登录</button>
    </div>
    <i-message id="message" :content="warnMessage" duration="2"/>
  </div>
</template>

<script>
import CryptoJS, { SHA1 } from 'crypto-js'
import { currentDate } from '../../utils/DateString'
import { encryptByDES, encryptPassword } from '../../utils/encrypt'
import  Api from '@Api'

export default {
  onShow(){
    if(wx.getStorageSync('sessionid')) {
      wx.clearStorageSync()
    }
  },
  data () {
    return {
      isActive: true,
      codeContent: '获取验证码',
      currentTime: 60,
      isClick: false,
      warnMessage: '',
      // Code:  登陆API（00021001）短信登录API （00021005）,
      userInfo: {
        Mobile: '',
        LoginPwd: '',
        MsgCodes: '',
        TimeSptams: '',
        Tokens: ''
      }
    }
  },
  methods: {
    // 忘记密码 / 注册
    operate(type){
      wx.navigateTo({
        url: '/pages/enterMobilePhoneNumber/main?type=' + type
      })
    },
    // tab nav切换
    switchTab (val) {
      this.isActive = val === 0 ? false : true
    },
    // 获取验证码
    getCode(){
      let encrypt = {
        Code: "00021003",
        Mobile: this.userInfo.Mobile,
        TimeSptams: currentDate,
        SendMsgType: '3',
        Tokens: ''
      }

      let msg = `${encrypt.Mobile}${encrypt.SendMsgType}${encrypt.TimeSptams}`

      encrypt.Tokens = encryptByDES(msg)

      Api.bankList(encrypt)
      .then(res => {
        if(res.data.Message.ErrorMessage) {
          this.progressTips(res.data.Message.ErrorMessage.ErrMsg)
          return
        }
          this.progressTips('短信已发送，请查看', 'success')
      })
      .catch(err => {
          this.progressTips('发送失败，请重试', 'error')
      })

      this.userInfo.TimeSptams = encrypt.TimeSptams
      this.userInfo.SendMsgType = encrypt.SendMsgType
    },
    // 短信登录 / 账号密码登录
    logIn(){
        // 初始数据
        let initData = {
          Code: 21101,
          IsTokenLogin: 'FALSE',
          Mobile: this.userInfo.Mobile,
        }
        if(this.isActive) { // 账户密码
          initData = Object.assign({}, initData, { LoginPwd: encryptPassword(this.userInfo.LoginPwd) })
        } else { // 短信登录
          let key = `${this.userInfo.Mobile}${this.userInfo.MsgCodes}${this.userInfo.TimeSptams}`

          initData = Object.assign(
            {},
            initData,
            this.userInfo,
            {
              Code: 21005,
              Tokens: encryptByDES(key)
            }
          )
          delete initData.IsTokenLogin
          delete initData.LoginPwd
        }
        Api.bankList(initData)
        .then(res => {
          if(res.data.Message) {
            const { ErrorMessage, IsBaseUserInfo, JHPayRegistStatus } = res.data.Message;
            if(ErrorMessage) {
              this.progressTips(ErrorMessage.ErrMsg, 'error')
              return;
            }
            // 设置用户信息
            wx.setStorage({
              key: 'userInfo',
              data: JSON.stringify(res.data.Message)
            })
            wx.setStorage({
              key: 'sessionid',
              data: JSON.stringify(res.headers["set-cookie"]),
              success(){
                // JHPayRegistStatus
                // -1：未注册
                // 0：审核中
                // 1：审核通过
                // 2：审核未通过
                switch(JHPayRegistStatus){
                  case '-1':
                    wx.redirectTo({
                      url: '/pages/information/main'
                    })
                  break;
                  case '0':
                  case '2':
                    wx.redirectTo({
                      url: '/pages/result/main'
                    })
                  break;
                  default:
                    wx.redirectTo({
                      url: '/pages/showQr/showQr'
                    })
                }
              }
            })



            // wx.setStorage({
            //   key: 'sessionid',
            //   data: JSON.stringify(res.headers["set-cookie"]),
            //   success(){
            // if(res.data.Message.JHPayRegistStatus === '-1') {
            //     wx.redirectTo({
            //       url: '/pages/information/main'
            //     })
            // } else if(res.data.Message.JHPayRegistStatus === '0' || res.data.Message.JHPayRegistStatus === '2') {
            //     wx.redirectTo({
            //       url: '/pages/result/main'
            //     })
            // } else{
            //     wx.redirectTo({
            //       url: '/pages/showQr/showQr'
            //     })
            // }
            //   }
            // })
          }
        })
        .catch(err=> {
          this.progressTips('请求地址失败，请稍后重试', 'error')
        })
    },
    // 重新发送动画
    intervalTime(e){
      this.getCode();
      if(this.userInfo.Mobile === '') {
        return;
      }
      let time = 60;
      this.isClick = !this.isClick
      var timer = setInterval(() => {
        time --;
        this.codeContent = `重新发送(${time})`
        if(time <= 0) {
          clearInterval(timer)
          time = 5;
          this.codeContent = `获取验证码`
          this.isClick = !this.isClick
        }
      }, 1000);

    },
    // Tip
    progressTips(warnMessage,type){
      this.$message({
        content: warnMessage,
        type: type || 'warning'
      })
    },
    // 检查表单
    checkForm(){
      if (this.userInfo.Mobile.length == 0) {
        this.progressTips('手机号码不能为空')
        return;
      }
      if (this.userInfo.Mobile.length < 11) {
        this.progressTips('手机号码长度有误！')
        return;
      }
      if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.userInfo.Mobile)) {
        this.progressTips('错误的手机号码！')
        return;
      }
      if(this.userInfo.MsgCodes === '' && !this.isActive) {
        this.progressTips('请输入验证码');
        return;
      }
      if(this.userInfo.LoginPwd === '' && this.isActive) {
        this.progressTips('请输入密码');
        return;
      }
      return {
        pass: true
      }
    },
    // 密码加密
    // shaPwd(pwd){
    //     const srcs = CryptoJS.enc.Utf8.parse(pwd)

    //     const encrypted = SHA1(srcs)

    //     return CryptoJS.enc.Base64.stringify(encrypted)
    // },
    // 验证码加密
    // encryptByDES(message, key) {
    //   var keyHex = CryptoJS.enc.Utf8.parse(key);
    //   var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    //       mode: CryptoJS.mode.ECB,
    //       padding: CryptoJS.pad.Pkcs7
    //   });
    //   return encrypted.toString();
    // },

    // 提交结果
    getResult(){
      // 验证登录
      if(this.checkForm()){
        this.logIn()
      }
    }
  },

  created () {
    // let app = getApp()

  }
}
</script>

<style scoped>
/* 1px = 2px */
.title {
  font-size: 32rpx;

  display: flex;

  justify-content: center;
}

.login-phone,
.login-normal {
  padding: 20rpx;

  color: #f5f5f5;
}
.active {
  color: rgba(255, 255, 255, .3);
}
.login-form {
  position: absolute;
  top: 25%;
  bottom: 0;

  width: 90%;
  margin: auto;
  padding: 40rpx;
}
.form-container .form-control {
  height: 40rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  /* padding-bottom: 20rpx; */
  padding-left: 100rpx;

  border-bottom: 1rpx solid #ccc;
}
.form-container label {
  position: relative;

  width: 100%;
}
.form-container label i {
  font-size: 48rpx;

  position: absolute;
  top: 25rpx;
  bottom: 0;

  margin: auto;
}

button {
  font-size: 32rpx;
  line-height: 90rpx;

  height: 90rpx;

  color: #fff;
  border: none;
  background: linear-gradient(90deg,#3d73f6, #3391f9);
  /* #3D73F6 #3391F9 */
}
.obtain {
  line-height: 80rpx;

  position: absolute;
  z-index: 99;
  top: -110rpx;
  left: 400rpx;

  width: 250rpx;
  height: 80rpx;
}
.forget {
  font-size: 32rpx;
  line-height: 100rpx;

  height: 100rpx;

  color: #b5bbc4;
}
.forget > span:last-child {
  float: right;
}
.disable {
  background: #ccc;
}
.login-icon {
  position: absolute;
  top: 25rpx;
}
.background {
  position: fixed;
  z-index: -999;
  top: 0;

  width: 100%;
  height: 300rpx;
}

</style>
