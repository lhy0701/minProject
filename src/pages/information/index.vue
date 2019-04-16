<template>
  <div class="register">
    <i-message id="message"/>
    <i-notice-bar>您尚未注册便捷收款功能，请先完善注册信息</i-notice-bar>
    <i-panel title="基本信息">
      <i-cell-group>
        <i-cell title="商户名称">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入商户名称"
            v-model.trim="register.CompanyName"
          >
        </i-cell>
        <i-cell title="商户简称">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入商户简称"
            v-model.trim="register.ForShortName"
          >
        </i-cell>
        <i-cell title="注册地址">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入注册地址"
            v-model.trim="register.RegisterAddress"
          >
        </i-cell>
        <i-cell title="营业地址">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入营业地址"
            v-model.trim="register.BussinessAddress"
          >
        </i-cell>
        <i-cell title="营业执照类型">
          <picker @change="setcheckedVal" v-model="register.Flagname" :range="options">
            <view class="picker i-my-input">{{register.Flagname || '请选择营业执照类型'}}</view>
          </picker>
        </i-cell>
        <i-cell title="营业执照号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请选择营业执照号"
            v-model.trim="register.RegistrationMark "
          >
        </i-cell>
        <i-cell title="税务登记号">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入税务登记号"
            v-model.trim="register.TaxNo "
          >
        </i-cell>
        <i-cell title="营业执照生效日期">
          <picker
            mode="date"
            start="1970-01-01"
            :v-model="register.RegistrationDateShow"
            @change="bindDateChange($event, 'RegistrationDate', 'RegistrationDateShow')"
          >
            <span class="i-my-input">{{register.RegistrationDateShow || '请选择日期'}}</span>
          </picker>
        </i-cell>
        <i-cell title="营业执照失效日期">
          <span
            i-class="i-cell-desc"
            @click="setIDCardDate('RegistrationValidDate', 'RegistrationValidDateShow')"
            style="color: #00a0ea;float:right;clear:both;"
          >设为长期有效</span>
          <picker
            mode="date"
            start="1970-01-01"
            :v-model="register.RegistrationValidDateShow"
            @change="bindDateChange($event, 'RegistrationValidDate', 'RegistrationValidDateShow')"
          >
            <label class="picker i-my-input">{{register.RegistrationValidDateShow || '请选择日期'}}</label>
          </picker>
        </i-cell>
        <i-cell title="法人姓名">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入法人姓名"
            v-model.trim="register.LegalPerson"
          >
        </i-cell>
        <i-cell title="法人证件号">
          <input
            class="i-my-input"
            type="idcard"
            placeholder="请输入法人证件号"
            v-model.trim="register.IDCard"
          >
        </i-cell>
        <i-cell title="法人身份证生效日期">
          <picker
            mode="date"
            :v-model="register.IDCardDateShow"
            start="1970-01-01"
            end="2099-12-31"
            @change="bindDateChange($event, 'IDCardDate', 'IDCardDateShow')"
          >
            <view class="picker i-my-input">{{register.IDCardDateShow || '请选择日期'}}</view>
          </picker>
        </i-cell>
        <i-cell title="法人身份证失效日期">
          <span
            i-class="i-cell-desc"
            @click="setIDCardDate('IDCardValidDate', 'IDCardValidDateShow')"
            style="color: #00a0ea;float:right;clear:both;"
          >设为长期有效</span>
          <picker
            start="1970-01-01"
            mode="date"
            :v-model="register.IDCardValidDateShow"
            @change="bindDateChange($event, 'IDCardValidDate', 'IDCardValidDateShow')"
          >
            <view class="picker i-my-input">{{register.IDCardValidDateShow || '请选择日期'}}</view>
          </picker>
        </i-cell>
        <i-cell title="经营范围">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入经营范围"
            v-model.trim="register.ScopeArea "
          >
        </i-cell>
        <i-cell title="客服电话">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入客服电话"
            v-model.trim="register.Telephone "
          >
        </i-cell>
        <i-cell title="商户管理员姓名">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入商户管理员姓名"
            v-model.trim="register.Administrator"
          >
        </i-cell>
        <i-cell title="管理员手机号码">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入管理员手机号码"
            v-model.trim="register.Mobile"
          >
        </i-cell>
        <i-cell title="管理人邮箱">
          <input
            class="i-my-input"
            type="text"
            placeholder="请输入管理人邮箱"
            v-model.trim="register.Email"
          >
        </i-cell>
        <i-cell title="所属地区">
          <picker mode="region" @change="RegionChange" v-model="register.affiliatingArea">
            <view
              class="picker i-my-input"
            >{{register.Province || '省'}} {{register.City || '市'}} {{register.District || '区'}}&nbsp;</view>
            <!-- <view class="picker">当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}</view> -->
          </picker>
          <!-- <input
          class="i-my-input"
          type="text"
          placeholder="请输入所属地区"
          v-model.trim="register.affiliatingArea"
          >-->
        </i-cell>
        <i-modal title="推荐代理人帮助" :actions="actions" :visible="isModal" @click="closeModal">
          <view>
            1.想要注册为代理人请致电：
            <span style="color:#00a0ea;">4006790900</span>
          </view>
          <view>2.若已注册为代理人，请保证输入手机与管理平台注册时的手机号码一致</view>
          <view>3.查看管理平台信息，请使用PC登录后台：</view>
          <view>
            <span style="color:#00a0ea;">https://admin.chexd.com/backend/</span>
          </view>
        </i-modal>
        <i-cell>
          <span i-class="i-cell-text" @click="showModal">推荐人手机号
            <i-icon type="feedback_fill" size="26" color="#666666"/>
          </span>
          <input
            class="i-my-input"
            type="text"
            placeholder="非必填，没有可不填"
            v-model.trim="register.OriMobile"
          >
        </i-cell>
      </i-cell-group>
      <i-button type="primary" size="large" @click="accountContent">下一步，完善对公入账信息</i-button>
      <div class="block"></div>
      <div class="block"></div>
    </i-panel>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isVisible: false, // 面板显示状态\
      isModal: false,
      actions: [{name: '关闭'}],
      options: [
        '个体工商户',
        '有限责任公司'
      ],
      register:{
        Flagname: "",
        Flag:"", // 类型：1-企业 2-个体户
        CompanyName:"", //商户名称
        ForShortName:"", // 商户简称
        RegisterAddress:"", // 注册地址
        BussinessAddress:"", // 经营地址
        RegistrationMark:"", //营业执照注册号
        RegistrationDate:"", // 营业执照生效日期
        RegistrationValidDate:"", // 营业执照有效期
        LegalPerson:"", // 法人
        IDCard:"", // 法人身份证
        IDCardDate:"", // 法人证件生效期
        IDCardValidDate:"", // 法人证件有效期
        Telephone:"", // 客服电话
        Administrator:"", // 商户管理员姓名
        Mobile:"", // 商户管理员手机号码
        Email:"", // 商户管理员邮箱
        TaxNo:"", // 税号
        ScopeArea:"", //经营范围
        OriMobile:"", // 推荐人手机号
        affiliatingArea: [], // 所属地区集合
        Province:"",
        // ProvinceId:"",
        City:"",
        // CityId:"",
        District:"",
        // DistrictId:"",
        RegistrationDateShow: '',
        RegistrationValidDateShow: '',
        IDCardDateShow: '',
        IDCardValidDateShow: ''
      },
      warnTip: {
        CompanyName:"请输入商户名称", //商户名称
        ForShortName:"请输入商户简称", // 商户简称
        RegisterAddress:"请输入注册地址", // 注册地址
        BussinessAddress:"请输入经营地址", // 经营地址
        Flag:"请选择营业执照类型", // 类型：1-企业 2-个体户
        RegistrationMark:"请输入营业执照号", //营业执照注册号
        RegistrationDate:"请选择营业执照生效日期", // 营业执照生效日期
        RegistrationValidDate:"请选择营业执照失效日期", // 营业执照有效期
        LegalPerson:"请输入法人姓名", // 法人
        IDCard:"请输入法人身份证", // 法人身份证
        IDCardDate:"请选择法人证件有效期", // 法人证件生效期
        IDCardValidDate:"请选择法人证件失效期", // 法人证件有效期
        Telephone:"请输入客服电话", // 客服电话
        Administrator:"请输入管理员姓名", // 商户管理员姓名
        Mobile:"请输入管理员手机号码", // 商户管理员手机号码
        Email:"请输入管理人邮箱", // 商户管理员邮箱
        TaxNo:"请输入税务登记号", // 税号
        ScopeArea:"请输入经营范围", //经营范围
        OriMobile:"", // 推荐人手机号
        Province:"请选择所属地区",
        City:"请选择所属地区",
        District:"请选择所属地区",
        RegistrationDateShow: '请选择营业执照生效日期',
        RegistrationValidDateShow: '请选择营业执照失效日期',
        IDCardDateShow: '请选择法人证件有效期',
        IDCardValidDateShow: '请选择法人证件失效期'
      }
    }
  },
  mounted(){
    let logOnMessage = {}

    if(wx.getStorageSync('logOnMessage')) {
      logOnMessage = JSON.parse(wx.getStorageSync('logOnMessage'))
    }

    let obj = {}
    console.log(logOnMessage)
    for(let key in this.register) {
      if(key === 'Flag') {
        obj['Flagname'] = logOnMessage[key] === '0' ? '个体工商户' : '有限责任公司' // "类型：1-企业 2-个体户",
      }
      if(logOnMessage[key]) {
        switch(key) {
          case 'RegistrationDate':
            obj['RegistrationDateShow'] =this.transitionTime(logOnMessage[key])
          case 'RegistrationValidDate':
            obj['RegistrationValidDateShow'] =this.transitionTime(logOnMessage[key])
          case 'IDCardDate':
            obj['IDCardDateShow'] =this.transitionTime(logOnMessage[key])
          case 'IDCardValidDate':
            obj['IDCardValidDateShow'] =this.transitionTime(logOnMessage[key])
          default:
          obj[key] = logOnMessage[key];
        }
      }

    }

    this.register = Object.assign({}, this.register, obj)
    // 18810013034
  },
  methods: {
    transitionTime (timeStr) {
      return timeStr && timeStr * 1 !== 0
      ? timeStr
          .match(/(\d{8})|(\d{6}|\d{4}|\d{2})/g)
          .map((item, index) => {
            if (index >= 1) {
              return item.replace(/(\d{2})/g, '$1:').replace(/:$/, '')
            }
            return item.replace(/\d{4}/g, ($1, $2) => {
              if ($2 === 4) {
                return $1.replace(/(\d{2})/g, '-$1')
              }
              return $1
            })
          })[0]
      : ''
    },
    setcheckedVal({mp}){
      this.register.Flagname = this.options[mp.detail.value]
      this.register.Flag = mp.detail.value
    },
    // 所属地区
    RegionChange({mp}){
      this.register.affiliatingArea = [mp.detail.code[0], mp.detail.code[1], mp.detail.code[2]]
      this.register.Province = mp.detail.value[0].replace(/省|市/g, '')
      this.register.City = mp.detail.value[1].replace(/市/g, '')
      this.register.District = mp.detail.value[2].replace(/区|县/g, '')
    },
    showModal(){
      this.isModal = true
    },
    closeModal(){
      this.isModal = false
    },
    setIDCardDate(key, show){
      this.register[key] = '29991231000000'
      this.register[show] = '2999-12-31'
    },
    // 校验
    checkRegister(){
      let nullArr = []
      for(let key in this.register) {
        if(this.register[key] === '' && key !== 'OriMobile') {
          nullArr.push(key)
        }
      }
      for(let i = 0; i < nullArr.length; i++) {
        if(this.warnTip[nullArr[i]] !== undefined && this.warnTip[nullArr[i]] !== '') {
          this.$message({
            content: this.warnTip[nullArr[i]],
            type: 'warning'
          })
          return
        }
      }
      if(nullArr.length > 0) {
        this.$message({
          content: '请完善商户信息',
          type: 'warning'
        })
        return;
      }
      if(this.register.OriMobile !== '') {
        if(!/^1[34578]\d{9}$/.test(this.register.OriMobile)) {
          this.$message({
            content: '推荐人手机号码格式错误',
            type: 'warning'
          })
          return;
        }
      }
      if(!/^1[34578]\d{9}$/.test(this.register.Mobile)) {
        this.$message({
          content: '管理员手机格式错误',
          type: 'warning'
        })
        return;
      }
      return true
    },
    accountContent(){

      if(this.checkRegister()){
        wx.setStorage({
          key: 'firstMessage',
          data: JSON.stringify(this.register)
        })
        wx.navigateTo({
          url: '/pages/account/main'
        })
      }
    },
    formData(date){
       return Date.parse(new Date(date))
    },
    // 修改日期,判断日期规范
    bindDateChange({mp}, key, showKey){
      let currTime = this.formData(mp.detail.value)
      if(key === 'RegistrationDate'){
        if(this.register.RegistrationValidDateShow !== '') {
          let nextTime = this.formData(this.register.RegistrationValidDateShow)
          if(!(currTime < nextTime)) {
            this.$message({
              content: '营业生效日期不可超过失效日期',
              type: 'error'
            })
            return;
          }
        }
      } else if(key === 'RegistrationValidDate') {
        if(this.register.RegistrationDateShow !== '') {
          let nextTime = this.formData(this.register.RegistrationDateShow)
          if(!(currTime > nextTime)) {
            this.$message({
              content: '营业失效日期不可低于生效日期',
              type: 'error'
            })
            return;
          }
        }
      } else if(key === 'IDCardDate'){
        if(this.register.IDCardValidDateShow !== '') {
          let nextTime = this.formData(this.register.IDCardValidDateShow)
          if(!(currTime < nextTime)) {
            this.$message({
              content: '法人证件生效日期不可超过失效日期',
              type: 'error'
            })
            return;
          }
        }
      } else if(key === 'IDCardValidDate') {
        if(this.register.IDCardDateShow !== '') {
          let nextTime = this.formData(this.register.IDCardDateShow)
          if(!(currTime > nextTime)) {
            this.$message({
              content: '法人证件失效日期不可低于生效日期',
              type: 'error'
            })
            return;
          }
        }
      }
      // showKey
     this.register[showKey] = mp.detail.value
     this.register[key] = mp.detail.value.replace(/-/g, '') + '000000'
    }
  }
}
</script>

<style scoped>
/* 1px = 2rpx */
.form-title {
  font-size: 28rpx;

  padding: 20rpx 0;

  text-align: center;

  color: #f00;
}

.i-my-input {
  position: absolute;
  top: 25rpx;
  right: 25rpx;

  display: inline-block;
  overflow: hidden;

  width: 300rpx;

  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.block {
  width: 100%;
  height: 1rpx;
}

</style>
