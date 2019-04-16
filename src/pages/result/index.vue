<template>
  <div>
    <div v-if="isPass === '0'" class="result-container">
      <i-icon type="activity" size="100" color="#80848f"></i-icon>
      <div>
        <div>提交信息成功，等待审核中...</div>
        <div class="tip">审核周期约为12个小时</div>
      </div>
    </div>
    <div v-else-if="isPass === '2'" class="result-container">
      <i-icon type="delete_fill" size="100" color="#F54C55"></i-icon>
      <div class="title">审核失败，请重新提交注册信息</div>
      <div class="title">{{JHpay}}</div>
      <button @click="returnRegister">提交注册信息</button>
    </div>
  </div>
</template>

<script>
import  Api from '@Api'
export default {
  onLoad(){
    if(wx.getStorageSync('isPass') !== '') {
      this.isPass = wx.getStorageSync('isPass')
      return;
    }
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    this.isPass = userInfo.JHPayRegistStatus
  },
  data () {
    return {
      isPass: ''
    }
  },
  methods: {
    // 审核未通过
    returnRegister(){
      Api.bankList({
        Code: '24057',
        SourceId: '2'
      })
      .then((result) => {
        wx.setStorage({
          key: 'logOnMessage',
          data: JSON.stringify(result.data.Message.QRApplicationItem),
          success(){
            wx.redirectTo({
              url: '/pages/information/main'
            })
          }
        })
      }).catch((err) => {

      });
    }
  },
  onShow(){

  },
  mounted () {
    console.log(this.isPass)
    // let app = getApp()
    // 18701367882
  }
}
</script>

<style scoped>
.result-container {
  position: absolute;
  top: 35%;
  left: 10%;

  width: 80%;

  text-align: center;
}
.tip {
  font-size: 28rpx;

  color: #ccc;
}
.title {
  font-size: 32rpx;

  margin-bottom: 15rpx;
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

</style>
