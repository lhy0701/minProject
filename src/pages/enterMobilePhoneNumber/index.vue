<template>
  <div class="wrapper">
    <i-message id="message"></i-message>
    <input type="text" v-model="mobile" placeholder="请输入手机号" minlength="11" maxlength="11">
    <button class="next-step" @click="nextStep">下一步</button>
  </div>
</template>
<script>
import Api from '@Api'
import CryptoJS from 'crypto-js'
export default {
  onLoad(option){
    this.SendMsgType = option.type
  },
  onShow(){
    if(this.mobile !== '') {
      this.mobile = ''
    }
  },
  data(){
    return {
      mobile: '',
      SendMsgType: ''
    }
  },
  methods: {
    encryptByDES(message, key) {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
    nextStep(){
      // 手机格式正确
      if(/^1[34578]\d{9}$/.test(this.mobile)) {
        let encrypt = {
          Code: "21003",
          Mobile: this.mobile,
          TimeSptams: String(Date.parse(new Date())),
          SendMsgType: this.SendMsgType, // 忘记密码 4 新用户 5,
          Tokens: ''
        }
        let msg = `${encrypt.Mobile}${encrypt.SendMsgType}${encrypt.TimeSptams}`
        // 加密密码
        encrypt.Tokens = this.encryptByDES(msg,'jinmusen7931BEIJING')
        // 获取验证码
        // wx.navigateTo({
        //   url: '/pages/inputVerificationCode/main?mobile=' + this.mobile
        // })
        Api.bankList(encrypt)
          .then(res => {
            if(res.data.Message.ErrorMessage) {
              this.$message({
                content: res.data.Message.ErrorMessage.ErrMsg,
                type: 'error'
              })
              return
            }
            wx.navigateTo({
              url: '/pages/inputVerificationCode/main?mobile=' + this.mobile + '&timesptams=' + encrypt.TimeSptams + '&type=' + this.SendMsgType + '&msgtype=' + encrypt.SendMsgType
            })
          })
          .catch(err => {
              this.$message({
                content: '发送失败，请重试',
                type: 'error'
              })
          })
      } else {
        this.$message({
          content: '请输入正确手机号码',
          type: 'error'
        })
        return;
      }
      //
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
  padding-left: 10rpx;

  border-bottom: 1px solid #ccc;
}
.wrapper {
  padding: 20rpx;
}

</style>
