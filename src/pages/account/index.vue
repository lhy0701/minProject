<template>
  <i-panel title="入公银行卡信息" i-class="panel-title">
    <i-message id="message"/>
    <div class="register">
      <!-- <i-message id="message"/> -->
      <i-cell-group>
        <i-cell i-class="require" title="银行卡号">
          <input
            class="i-my-input"
            type="number"
            placeholder="请输入银行卡号"
            v-model.trim="registerForm.AccountNum"
          >
        </i-cell>
        <i-cell title="开户名称">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入开户名称"
            v-model.trim="registerForm.AccountPer"
          >
        </i-cell>
        <i-cell title="开户银行名称">
          <picker @change="changeBank" v-model="registerForm.BankName" :range="bankData">
            <view class="picker i-my-input">{{registerForm.BankName || '选择银行名称'}}</view>
          </picker>
        </i-cell>
        <i-cell
          title="开户行支行"
          is-link
          url="/pages/searchBank/main?type=account"
          :label="registerForm.SubBranchBankName"
        >
          <!-- <span class="bankshow">{{registerForm.SubBranchBankName}}</span> -->
        </i-cell>
        <i-cell title="联行号" :value=" registerForm.InterBankNum || '联行号'"></i-cell>
        <i-cell title="银行预留手机号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入银行预留手机号"
            v-model.trim="registerForm.AcctMobile"
          >
        </i-cell>
        <i-panel title="其他对公信息">
          <i-cell
            v-for="item in imageCollection"
            :key="item"
            :title="item.value"
            @click="openFile(item.key)"
          >
            <img
              class="input-img clear"
              v-if="registerForm[item.key]"
              :src="registerForm[item.key]"
              :alt="registerForm[item.key]"
            >
            <i-icon v-else class="i-my-input clear" type="dynamic_fill" size="28" color="#80848f"/>
          </i-cell>
        </i-panel>
      </i-cell-group>
      <i-button type="primary" size="large" @click="accountContent">下一步，对私入账信息(选填)</i-button>
      <i-button type="primary" size="large" @click="submitForm">提交</i-button>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </i-panel>
</template>

<script>
import  Api from '@Api'
export default {
  onShow(option) {
    const bank = wx.getStorageSync('openingBank')
    if(wx.getStorageSync('openingBank')) {
      this.registerForm.SubBranchBankName = bank.BankName
      this.registerForm.InterBankNum = bank.InterBankNum
    }
    wx.setStorage({
      key: 'accountBank',
      data: 'openingBank'
    })
  },
  data () {
    return {
      // 捕捉bug
      // fill: '',
      // err: '',
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
        "AccountNum":"",
        "AccountPer":"",
        "BankName":"",
        "SubBranchBankName":"",
        "BankCode":"",
        "InterBankNum":"",
        "AcctMobile": "",
        "ImgUrl": "",
        // "ImgUrlNo":"",
        "IDCardImgUrlA": "",
        // "IDCardImgUrlANo":"",
        "IDCardImgUrlB": "",
        // "IDCardImgUrlBNo":"",
        "AccountImgUrlA": "",
        // "AccountImgUrlANo":"",
        "AccountImgUrlB": "",
        // "AccountImgUrlBNo":"",
        "InStoreImgUrl": "",
        // "InStoreImgUrlNo":"",
        "CheckStandImgUrl": "",
        // "CheckStandImgUrlNo":"",
        "GoodsImgUrl": "",
        // "GoodsImgUrlNo":"",
        "LicenseImgUrl":  "",
        // "LicenseImgUrlNo":"",
        // "Status":"",
        // "Memo":"",
        // "Id":"",
        // "MerChantNo":"",
        // "AuthCode":""
      },
      registerFormRules: {
        "AccountNum":"请输入银行卡号",
        "AccountPer":"请输入开户名称",
        "BankName":"请选择开户银行",
        "AcctMobile": "请输入银行预留手机号",
        "SubBranchBankName":"",
        "BankCode":"",
        "InterBankNum":"请选择开户行支行",
        "ImgUrl":"请上传营业执照",
        // "ImgUrlNo":"",
        "IDCardImgUrlA":"请上传法人身份证照片(正)",
        // "IDCardImgUrlANo":"",
        "IDCardImgUrlB":"请上传法人身份证照片(反)",
        // "IDCardImgUrlBNo":"",
        "AccountImgUrlA":"请上传公户银行卡照片(正)",
        // "AccountImgUrlANo":"",
        "AccountImgUrlB":"请上传公户银行卡照片(反)",
        // "AccountImgUrlBNo":"",
        "InStoreImgUrl":"请上传门头照片",
        // "InStoreImgUrlNo":"",
        "CheckStandImgUrl":"请上传收银台照片",
        // "CheckStandImgUrlNo":"",
        "GoodsImgUrl":"请上传内部商品照片",
        // "GoodsImgUrlNo":"",
        "LicenseImgUrl":"请上传开户许可证照片",
        // "LicenseImgUrlNo":"",
        // "Status":"",
        // "Memo":"",
        // "Id":"",
        // "MerChantNo":"",
        // "AuthCode":""
      },
      imageCollection: [
        {
          key: 'ImgUrl',
          value: "上传营业执照"
        },
        {
          key:"IDCardImgUrlA",
          value: "法人身份证照片（正面）"
        },
        {
          key:"IDCardImgUrlB" ,
          value: "法人身份证照片（反面）"
        },
        {
          key: 'InStoreImgUrl',
          value: '上传门头照片'
        },
        {
          key:"CheckStandImgUrl",
          value: "上传收银台照片"
        },
        {
          key:"GoodsImgUrl" ,
          value: "上传内部商品照片"
        },
        {
          key:"LicenseImgUrl",
          value: "上传开户许可证照片"
        },
        {
          key:"AccountImgUrlA",
          value: "上传公户银行卡照片（正）"
        },
        {
          key:"AccountImgUrlB",
          value: "上传公户银行卡照片（反）"
        }
      ]
    }
  },
  mounted(){
    let logOnMessage = JSON.parse(wx.getStorageSync('logOnMessage'))
    let obj = {}
    for(let key in this.registerForm) {

      if(logOnMessage[key]) {
       obj[key] = logOnMessage[key];
      }
    }
    this.registerForm = Object.assign({}, this.registerForm, obj)
  },
  methods: {
    // 选择银行
    changeBank({mp}){
      this.registerForm.BankName = this.bankData[mp.detail.value]
      this.registerForm.BankCode = mp.detail.value * 1 + 1
    },
    // 上传图片
    uploadFile(filepath, key){
      let _this = this
      wx.uploadFile({
        url: 'https://shop.chexd.com/apis/upload/uploadFile', //示例，非真实的接口地址
        filePath: filepath,//默认小程序内音频路径，也可以自己上传
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success:  (res) => {
          const url = JSON.parse(res.data).datas
          const {baseUrl, filePath} = url;
          this.registerForm[key] = baseUrl + filePath
        },
        fail: function (res) {
        },
        complete: function (res) {
        }
      })
    },
    // 查找图片文件
    openFile(key){
      console.log('openfile')
      // registerForm
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:(val) => {
          this.uploadFile(val.tempFilePaths[0], key)

        // 接口调用成功的回调函数
        },
        fail: () => {
            // 接口调用失败的回调函数
        },
        complete: (val) => {


          // 接口调用结束的回调函数（调用成功、失败都会执行）
        }
      })
    },
    // 检查表单内容
    cheCkenterAccount(){
      let noInput = []
      for(let key in this.registerForm) {
        if(this.registerForm[key] === '') {
          noInput.push(key)
        }
      }
      for(let i = 0; i < noInput.length; i++) {
        if(this.registerFormRules[noInput[i]] && this.registerFormRules[noInput[i]] !== '') {
          // 如果是个体工商户，可跳过公户，开户许可证图片
          if(JSON.parse(wx.getStorageSync('firstMessage')).Flag === '0') {
            switch(noInput[i]) {
              case 'AccountImgUrlA':
              case 'AccountImgUrlB':
              case 'LicenseImgUrl':
              break;
              default:
              this.$message({
                content: this.registerFormRules[noInput[i]],
                type: 'warning'
              })
              return;
            }
          } else {
            this.$message({
              content: this.registerFormRules[noInput[i]],
              type: 'warning'
            })
            return;
          }
        }
      }
      return true
    },
    // 存储表单信息，进入到对私入账信息
    accountContent(){
      if(this.cheCkenterAccount()) {
        const [firstMessage] = [wx.getStorageSync('firstMessage')]
        const registerForm = Object.assign({}, {...this.registerForm}, JSON.parse(firstMessage))
        wx.setStorage({
          key: 'publicAccounts',
          data: JSON.stringify(registerForm),
          success(){
            wx.navigateTo({
              url: '/pages/bankCard/main'
            })
          }
        })
      }

    },
    // 提交表单信息
    submitForm(){
      if(this.cheCkenterAccount()) {
        const [firstMessage] = [wx.getStorageSync('firstMessage')]
        const registerForm = Object.assign({}, {...this.registerForm}, JSON.parse(firstMessage))

        Api.bankList({
          Code: '24059',
          SourceId:"2",
          QRApplicationItem: registerForm
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

.require:before {
  position: absolute;

  content: '*';

  color: #f00;
}
.panel-title {
  background: #f5f5f5;
}

.block {
  width: 100%;
  height: 1rpx;
}

</style>
