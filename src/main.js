import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$message = require('../static/iviewWabapp/base/index').$Message
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
