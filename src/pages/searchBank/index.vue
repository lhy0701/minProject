<template>
  <div class="register">
    <i-message id="message"></i-message>
    <div class="topWrap">
      <input type="text" v-model="BankName">
      <button @click="searchBank(0)">搜索</button>
    </div>
    <i-cell-group>
      <i-cell
        v-for="(item, index) in searchBankList"
        :key="item"
        @click="getCurrentBank(index)"
      >{{item.BankName}}</i-cell>
      <div class="btn" v-if="loadmore" @click="loadmoreBank">加载更多...</div>
    </i-cell-group>
  </div>
</template>

<script>
import  Api from '@Api'
export default {

  data(){
    return {
      BankName: '',
      searchBankList: [],
      initPage: 1,
      loadmore:false
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.BankName = ''
      this.searchBankList = []
      this.initPage = 1
      this.loadmore = false
    },
    loadmoreBank(){
      this.initPage = this.initPage + 1
      this.searchBank(1)
    },
    searchBank(flag){
      Api.bankList({
        Code: '00031095',
        Page: this.initPage,
        BankName: this.BankName
      })
      .then((res) => {
        if(res.data.Message.ErrorMessage) {
          this.$message({
            content: res.data.Message.ErrorMessage.ErrMsg,
            type: 'error'
          })
          return
        }
        if(res.data.Message.InterBankListGroup.length > 0) {
          this.loadmore = true
        } else {
          this.loadmore = false
        }
        if(flag === 0) {
          this.searchBankList = res.data.Message.InterBankListGroup
        } else {
          this.searchBankList = [...this.searchBankList, ...res.data.Message.InterBankListGroup]
        }
      })
    },
    getCurrentBank(index){

      wx.setStorage({
        key: 'openingBank',
        currentBank: JSON.stringify(this.searchBankList[index])
      })

      wx.setStorage({
        key: wx.getStorageSync('accountBank') ,
        data: this.searchBankList[index],
        success: function () {
          wx.navigateBack();   //返回上一个页面
        }
      })
      // wx.navigateBack({
      //   url: `/pages/account/main?bankname=${this.searchBankList[index].BankName}&banknum=${this.searchBankList[index].InterBankNum}`
      // })
    }
  },
  //  onLoad(option) {
  //   console.log(option.query)
  // }
}
</script>

<style scoped>
/* 1px = 2rpx */
.topWrap {
  overflow: hidden;

  padding: 20px;
}
.topWrap input {
  float: left;

  width: 70%;
}
input {
  height: 35px;
  padding-left: 10px;

  border: 1px solid #ccc;
}
button {
  font-size: 32rpx;
  line-height: 35px;

  height: 38px;

  color: #fff;
  border-radius: 0;
  background: #09f;
}
.btn{
  text-align: center;
  width: 100%;
  font-size: 28rpx;
}
</style>
