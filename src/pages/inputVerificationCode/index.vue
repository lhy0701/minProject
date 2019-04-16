<template>
  <div class="wrapper">
    <i-message id="message"></i-message>
    <label for="">
      验证码已发送至：
      <span class="phone-mobile">{{mobile}}</span>
    </label>
    <input
      type="text"
      placeholder="请输入验证码"
      v-model="verificationCode"
      required
      minlength="6"
      maxlength="6"
    >
    <button class="nextStep" @click="nextStep">下一步</button>
  </div>
</template>
<script>
import Api from '@Api'
import CryptoJS, { SHA1 } from 'crypto-js'

export default {
  onLoad(option) {
    this.mobile = option.mobile
    this.timesptams = option.timesptams
    this.type = option.type
    this.SendMsgType = option.msgtype
  },
  data(){
    return {
      mobile: '',
      verificationCode: '',
      timesptams: '',
      type: '',
      SendMsgType: ''
    }
  },
  methods:{
    // 验证码加密
    encryptByDES(message, key) {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
    // 格式数据
    initData(){
      let initData = {
        Code: 21005,
        Mobile: this.mobile,
        MsgCodes: this.verificationCode,
        TimeSptams: this.timesptams,
        SendMsgType: this.SendMsgType
      }

      let key = `${this.mobile}${this.verificationCode}${this.timesptams}`;

      initData = Object.assign(
        {},
        initData,
        {
          Tokens: this.encryptByDES(key, 'jinmusen7931BEIJING')
        }
      )
      return initData
    },
    // 校验验证码
    requestResult(){
          // wx.navigateTo({
          //   url: '/pages/setThePassword/main?mobile=' + this.mobile + '&verifyCode='+ this.verificationCode
          // })
      Api.bankList(this.initData())
        .then((result) => {
          if(result.data.Message.ErrorMessage){
            this.$message({
              content: result.data.Message.ErrorMessage.ErrMsg,
              type: 'error'
            })
            return;
          }
          wx.navigateTo({
            url: '/pages/setThePassword/main?mobile=' + this.mobile + '&verifyCode='+ this.verificationCode + '&type=' + this.type
          })
        }).catch((err) => {
          this.$message({
            content: err,
            type: 'error'
          })
        })
    },
    nextStep(){

      if(this.verificationCode.length !== 6) {
        this.$message({
          content: '请输入验证码',
          type: 'error'
        })
        return;
      }
      this.requestResult()
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
.phone-mobile {
  color: #00a0ea;
}

</style>
