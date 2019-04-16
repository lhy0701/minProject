<template>
  <div class="registerdetail">
    <!-- 基本信息 -->
    <i-panel title="基本信息">
      <div
        v-if="registerMessage[value]"
        class="iview-cell clear"
        v-for="(key, value) in basicInformation"
        :key="key+value"
      >
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">{{registerMessage[value]}}</div>
      </div>
      <div class="iview-cell clear">
        <div class="iview-label clear">所属地区</div>
        <div
          class="iview-text"
        >{{registerMessage['Province']}} {{registerMessage['City']}} {{registerMessage['District']}}</div>
      </div>
    </i-panel>
    <!-- 入公银行卡信息 -->
    <i-panel title="入公银行卡信息">
      <div class="iview-cell clear" v-for="(key, value) in publicBank" :key="key+value">
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">{{registerMessage[value]}}</div>
      </div>
      <div class="iview-cell clear" v-for="(key, value) in firstImg" :key="key+value">
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">
          <img class="input-img" :src="registerMessage[value]" alt="">
        </div>
      </div>
    </i-panel>
    <!-- 其他信息 -->
    <i-panel title="其他信息">
      <div class="iview-cell clear" v-for="(key, value) in OtherInformation" :key="key+value">
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">
          <img class="input-img" :src="registerMessage[value]" alt="">
        </div>
      </div>
    </i-panel>
    <!-- 入私银行卡信息 -->
    <i-panel title="入私银行卡信息">
      <div class="iview-cell clear" v-for="(key, value) in Privateinformation" :key="key+value">
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">{{registerMessage.PrivateBankItem[value]}}</div>
      </div>
    </i-panel>
    <!-- 其他入私信息 -->
    <i-panel title="其他入私信息">
      <div class="iview-cell clear" v-for="(key, value) in lastImg" :key="key+value">
        <div class="iview-label clear">{{key}}</div>
        <div class="iview-text">
          <img class="input-img" :src="registerMessage.PrivateBankItem[value]" alt="">
        </div>
      </div>
    </i-panel>
  </div>
</template>

<script>
import Api from '@Api'
export default {
  // onShow(option) {
  //   do someting
  // },
  data () {
    return {
      // 基本信息
      basicInformation: {
          CompanyName:"商户名称",
          ForShortName:"商户简称",
          RegisterAddress:"注册地址",
          BussinessAddress:"营业地址",
          Flag: "营业执照类型",
          TaxNo:"税务登记号",
          RegistrationMark:"营业执照号",
          RegistrationDate:"营业执照生效日期",
          RegistrationValidDate:"营业执照失效日期",
          LegalPerson:"法人姓名",
          IDCard:"法人证件号",
          IDCardDate:"法人身份证生效日期",
          IDCardValidDate:"法人身份证失效日期",
          ScopeArea:"经营范围",
          Telephone:"客服电话",
          Administrator:"商户管理员姓名",
          Mobile:"管理员手机号码",
          Email:"管理人邮箱",
          OriMobile:"管理员手机号码"
      },
      // 入公银行卡信息
      publicBank: {
        AccountNum:"银行卡号",
        AccountPer:"开户名称",
        BankName:"开户银行",
        AcctMobile: "银行预留手机号",
        SubBranchBankName:"开户行支行",
        BankCode:"联行号",
      },
      // 其他对公信息
      firstImg:{
        ImgUrl: "营业执照",
        IDCardImgUrlA: "法人身份证照片(正)",
        IDCardImgUrlB: "法人身份证照片(反)",
        InStoreImgUrl: "门头照片",
        CheckStandImgUrl: "收银台照片",
        GoodsImgUrl: "内部商品照片"
      },
      // 其他信息
      OtherInformation: {
        LicenseImgUrl:  "开户许可证照片",
        AccountImgUrlA: "公户银行卡照片(正)",
        AccountImgUrlB: "公户银行卡照片(反)",
      },
      Privateinformation: {
        AccountPer:"开户人姓名",
        IDCard:"开户人身份证号码",
        Province:"开户省份",
        City:"开户城市",
        District:"开户区(县)",
        AccountNum:"银行卡号",
        BankName:"银行名称",
        SubBranchBankName:"开户行支行",
        InterBankNum:"联行号",
        InterBankNum:"开户行支行名称",
        AcctMobile:"银行预留手机号",
      },
      lastImg: {
        IDCardImgUrlA:"开户人身份证照片(正)",
        IDCardImgUrlB:"开户人身份证照片(反)",
        AccountImgUrlA:"入账银行卡照片(正)",
        AccountImgUrlB:"入账银行卡照片(反)",
      },
      registerMessage: {}
    }
  },
  mounted(){
    this.getDetail()
    // 18701367882
    // let registerMsg = JSON.parse(wx.getStorageSync('registerMessage'));
    // for(let key in registerMsg) {
    //   if(registerMsg[key]) {
    //     if(key === 'RegistrationDate' || key ==='RegistrationValidDate' || key ==='IDCardDate' || key ==='IDCardValidDate') {
    //       registerMsg[key] = registerMsg[key] === '0' ? '0000-00-00': registerMsg[key].replace(/[0-9]{6}$/g, '').match(/^([0-9]{4})|([0-9]{2})/g).join('-')
    //     }
    //     if(key === 'Flag') {
    //       registerMsg[key] = key === '0' ? '个体工商户' : '有限责任公司'
    //     }
    //   }

    // }
    // this.registerMessage = registerMsg

  },
  created () {
    // let app = getApp()
  },
  methods: {
    getDetail(){
      Api.bankList({
        Code: '24057',
        SourceId: '2'
      })
      .then((result) => {
        let registerMsg = result.data.Message.QRApplicationItem
        for(let key in registerMsg) {
          if(registerMsg[key] !== '') {
            if(key === 'RegistrationDate' || key ==='RegistrationValidDate' || key ==='IDCardDate' || key ==='IDCardValidDate') {
              registerMsg[key] = registerMsg[key] === '0' ? '0000-00-00': registerMsg[key].replace(/[0-9]{6}$/g, '').match(/^([0-9]{4})|([0-9]{2})/g).join('-')
            }
            if(key === 'Flag') {
              registerMsg[key] = key === '0' ? '个体工商户' : '有限责任公司'
            }
          }

        }
        this.registerMessage = registerMsg
      }).catch((err) => {

      });
    }
  }
}
</script>

<style>
.iview-cell {
  font-size: 32rpx;
  line-height: 100rpx;

  position: relative;

  padding: 0 15rpx;
}
.iview-cell .iview-label {
  font-size: 26rpx;

  /* float: left; */
}
.iview-cell .iview-text {
  font-size: 26rpx;

  position: absolute;
  top: 0;
  right: 20rpx;

  overflow: hidden;

  width: 40%;

  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.registerdetail .i-cell-ft {
  float: right!important;
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 1px = 2rpx */
.register div {
  display: flex;

  padding: 30rpx;

  border-top: 1rpx solid #ccc;

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
  width: 50rpx;
  height: 50rpx;
}
.bankshow {
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
}

.i-cell-ft {
  overflow: hidden!important;

  white-space: nowrap!important;
  text-overflow: ellipsis!important;
}

</style>
