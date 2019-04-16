<template>
  <div class="register">
    <i-message id="message"></i-message>
    <i-panel title="入私银行卡信息">
      <i-cell-group>
        <i-cell title="开户人姓名">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入开户人姓名"
            v-model.trim="registerForm.AccountPer"
          >
        </i-cell>
        <i-cell title="开户人身份证号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入开户人身份证号"
            v-model.trim="registerForm.IDCard"
          >
        </i-cell>
        <i-cell title="开户行省市区">
          <picker mode="region" @change="RegionChange" v-model="registerForm.affiliatingArea">
            <view
              class="picker i-my-input"
            >{{registerForm.Province || '省'}} {{registerForm.City || '市'}} {{registerForm.District || '区/县'}}&nbsp;</view>
          </picker>
        </i-cell>
        <i-cell title="银行卡号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入银行卡号"
            v-model.trim="registerForm.AccountNum"
          >
        </i-cell>
        <i-cell title="开户银行名称">
          <picker @change="changeBank" v-model="registerForm.BankName" :range="bankData">
            <view class="picker i-my-input">{{registerForm.BankName || '请选择银行'}}</view>
          </picker>
        </i-cell>
        <i-cell
          title="开户行支行"
          is-link
          url="/pages/searchBank/main?type=bankCard"
          :label="registerForm.SubBranchBankName"
        >
          <!-- <span>{{registerForm.SubBranchBankName}}</span> -->
        </i-cell>
        <i-cell title="联行号" :value="registerForm.InterBankNum || '联行号'"></i-cell>
        <i-cell title="银行预留手机号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入银行预留手机号"
            v-model.trim="registerForm.AcctMobile"
          >
        </i-cell>
        <!--  -->
        <i-panel title="其他入私信息">
          <i-cell
            v-for="item in imageCollection"
            :key="item"
            :title="item.value"
            @click="openFile(item.key)"
          >
            <img
              mode="aspectFit"
              class="input-img clear"
              lazy-load
              v-if="registerForm[item.key]"
              :src="registerForm[item.key]"
              :alt="registerForm[item.key]"
            >
            <i-icon v-else class="i-my-input clear" type="dynamic_fill" size="28" color="#80848f"/>
          </i-cell>
        </i-panel>
      </i-cell-group>
      <i-button type="primary" size="large" @click="requestBankCard">提交</i-button>
      <div class="block"></div>
      <div class="block"></div>
    </i-panel>
  </div>
</template>

<script>
import  Api from '@Api'
export default {
  onShow(option) {
    const bank = wx.getStorageSync('openingBankProvince')
    if(wx.getStorageSync('openingBankProvince')) {
      this.registerForm.SubBranchBankName = bank.BankName
      this.registerForm.InterBankNum = bank.InterBankNum
    }
    wx.setStorage({
      key: 'accountBank',
      data: 'openingBankProvince'
    })
  },
  data () {
    return {
      bankData: [
        "工商银行",
        "农业银行",
        "中国银行",
        "建设银行",
        "邮政储蓄银行",
        "交通银行",
        "中信银行",
        "光大银行",
        "华夏银行",
        "民生银行",
        "广发银行",
        "平安银行",
        "平安银行",
        "招商银行",
        "兴业银行",
        "上海浦东发展银行",
        "其他银行"
      ],
      registerForm: {
        AccountPer:"",
        IDCard:"",
        Province:"",
        City:"",
        District:"",
        AccountNum:"",
        BankName:"",
        BankCode:"",
        affiliatingArea: [],
        SubBranchBankName:"",
        InterBankNum:"",
        AcctMobile:"",
        IDCardImgUrlA:"",
        IDCardImgUrlB:"",
        AccountImgUrlA:"",
        AccountImgUrlB:"",
      },
      registerFormRules: {
        AccountPer:"请输入开户人姓名",
        IDCard:"请输入开户人身份证号码",
        Province:"请选省份",
        City:"请选择城市",
        District:"请选择区、县",
        AccountNum:"请输入银行卡号",
        BankName:"请选择银行",
        BankCode:"请选择银行",
        SubBranchBankName:"请选择开户行支行名称",
        InterBankNum:"请选择开户行支行名称",
        AcctMobile:"请输入银行预留手机号",
        IDCardImgUrlA:"请上传开户人身份证照片(正)",
        IDCardImgUrlB:"请上传开户人身份证照片(反)",
        AccountImgUrlA:"请上传入账银行卡照片(正)",
        AccountImgUrlB:"请上传入账银行卡照片(反)",
      },
      imageCollection: [
        {
          key: 'IDCardImgUrlA',
          value: "开户人身份证照片（正面）"
        },
        {
          key: "IDCardImgUrlB",
          value: "开户人身份证照片（反面）"
        },
        {
          key: "AccountImgUrlA" ,
          value: "入账银行卡照片（正面）"
        },
        {
          key: "AccountImgUrlB",
          value: "入账银行卡照片（反面）"
        }
      ]
    }
  },
  methods: {
    // 选择省份
    RegionChange({mp}){
      this.registerForm.ProvinceId = mp.detail.code[0]
      this.registerForm.CityId = mp.detail.code[1]
      this.registerForm.DistrictId = mp.detail.code[2]
      this.registerForm.Province = mp.detail.value[0].replace(/省|市/g, '')
      this.registerForm.City = mp.detail.value[1].replace(/市/g, '')
      this.registerForm.District = mp.detail.value[2].replace(/区|县/g, '')
    },
    // 选择银行
    changeBank({mp}){
      this.registerForm.BankName = this.bankData[mp.detail.value]
      this.registerForm.BankCode = mp.detail.value * 1 + 1
    },
    // 上传图片文件
    uploadFile(filepath, key){
      console.log('uploadFile....')
      wx.uploadFile({
        url: 'https://shop.chexd.com/apis/upload/uploadFile', //示例，非真实的接口地址
        filePath: filepath,//默认小程序内音频路径，也可以自己上传
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success:  (res) => {
          console.log(res)
          const url = JSON.parse(res.data).datas
          const {baseUrl, filePath} = url;
          this.registerForm[key] = `${baseUrl}${filePath}`
          if(baseUrl) {
            this.$message({
              content: '上传成功'
            })
          } else {
            this.$message({
              content: '上传失败'
            })
          }

        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res)
           this.$message({
              content: '上传失败'
            })
        }
      })
    },
    // 打开图片文件
    openFile(key){
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success:(val) => {
          this.uploadFile(val.tempFilePaths[0], key)
        // 接口调用成功的回调函数
        },
        fail: () => {
            // 接口调用失败的回调函数
        },
        complete: () => {
          // 接口调用结束的回调函数（调用成功、失败都会执行）
        }
      })
    },
    // 校验空值
    checkRequestForm(){
      let noInput = []
      for(let key in this.registerForm) {
        if(this.registerForm[key] === '') {
          noInput.push(key)
        }
      }
      for(let i = 0; i < noInput.length; i++) {
        if(this.registerFormRules[noInput[i]]) {
          this.$message({content:this.registerFormRules[noInput[i]], type: 'warning'})
          return
        }
      }
      return true
    },
    // 注册请求
    requestBankCard (){
      if(this.checkRequestForm()) {
        let information = Object.assign({}, JSON.parse(wx.getStorageSync('publicAccounts')))
        information.PrivateBankItem = this.registerForm
        // 请求注册私户
        Api.bankList({
          Code: '24059',
          SourceId:"2",
          QRApplicationItem: information
        })
        .then((res) => {
          if(res.data.Message.ErrorMessage){
            wx.showToast({
              title: res.data.Message.ErrorMessage.ErrMsg,
              icon:'none'
            })
          }
          wx.setStorage({
            key: 'isPass',
            data: '0',
            success(){
              wx.reLaunch({
                url: '/pages/result/main'
              })
            }
          })
        })
        .catch(err => {
            wx.showToast({
              title: '请求错误，请稍后重试',
              icon:'none'
            })
        })
      }
    }
  },
  mounted(){
    let logOnMessage = JSON.parse(wx.getStorageSync('logOnMessage'))
    let obj = {}
    for(let key in this.registerForm) {
      if(logOnMessage.PrivateBankItem[key]) {
          obj[key] = logOnMessage.PrivateBankItem[key];
      }
    }
    console.log(obj)
    this.registerForm = Object.assign({}, this.registerForm, obj)
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
/* 1px = 2rpx */
.register div {
  display: flex;

  padding: 30rpx;

  justify-content: space-between;
}
.register div > input {
  text-align: right;
}
.form-title {
  font-size: 28rpx;

  padding: 20rpx 0;

  text-align: center;

  color: #f00;
}
.next {
  font-size: 30rpx;
  line-height: 90rpx;

  width: 90%;
  height: 90rpx;
  margin: 50rpx auto;

  color: #fff;
  border-radius: 0;
  background: linear-gradient(90deg,#3d73f6, #3391f9);
}


.i-my-input {
  position: absolute;
  top: 25rpx;
  right: 25rpx;

  text-align: right;
}

.input-img {
  font-size: 100px;

  position: absolute;
  top: 20rpx;
  right: 50rpx;

  width: 28px;
  height: 28px;
}
.bankshow {
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
}
.block {
  width: 100%;
  height: 1rpx;
}

</style>
