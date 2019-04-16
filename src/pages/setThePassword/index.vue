<template>
  <div class="wrapper">
    <i-message id="message"></i-message>
    <input type="password" v-model="password" placeholder="请设置新密码" maxlength="20">
    <div class="tip">需 6 ~ 20 位字符</div>
    <button class="obtain" @click="nextStep">下一步</button>
  </div>
</template>
<script>
import Api from '@Api'
import { encryptByDES, encryptPassword } from '../../utils/encrypt'

export default {
  onLoad(option){
    this.type = option.type
    this.Mobile = option.mobile
  },
  data(){
    return {
      password: '',
      Mobile: ''
    }
  },
  methods:{
    nextStep(){
      if(this.password.length < 6) {
        this.$message({
          content: '密码需 6 ~ 20 位字符',
          type: 'error'
        })
        return
      }
      // 忘记密码 21045
      // 注册账号 21007
      Api.bankList({
        Code: this.type === '4' ? '21045' : '21007',
        Mobile: this.Mobile,
        LoginPwd: this.password
      })
        .then((result) => {
          if(result.data.ErrorMessage) {
            this.$message({
              content: result.data.ErrorMessage.ErrMsg,
              type: 'error'
            })
            return;
          }
          // 注册成功 || 修改成功
          // console.log('注册成功')
          Api.bankList({
            Code: 21101,
            IsTokenLogin: 'FALSE',
            Mobile: this.Mobile,
            LoginPwd: encryptPassword(this.password)
          })
          .then((res) => {
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
                      wx.reLaunch({
                        url: '/pages/information/main'
                      })
                    break;
                    case '0':
                    case '2':
                      wx.reLaunch({
                        url: '/pages/result/main'
                      })
                    break;
                    default:
                      wx.reLaunch({
                        url: '/pages/showQr/showQr'
                      })
                  }
                }
              })
            }
          })
        })
        .catch((err) => {
          console.log(err)
            this.$message({
              content: '请求错误，请稍后重试',
              type: 'error'
            })
        });
    }
  }
}
</script>
<style scoped>
button {
  font-size: 32rpx;
  line-height: 90rpx;

  height: 90rpx;

  color: #fff;
  border: none;
  background: linear-gradient(90deg,#3d73f6, #3391f9);
  /* #3D73F6 #3391F9 */
}
input {
  margin: 50rpx 0;
  margin-bottom: 10rpx;
  padding-left: 10rpx;

  border-bottom: 1px solid #ccc;
}
.wrapper {
  padding: 20rpx;
}
.phone-mobile {
  color: #00a0ea;
}
.tip {
  font-size: 28rpx;

  margin-bottom: 20rpx;

  color: #00a0ea;
}

</style>
