import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import { showToast, openIndicator, closeIndicator,showConfirm,callPhone,smsWechat,smsQq,smsPhone,sendEmail,clickUrl, mapNav, saveImage, } from '@/utils/jsBridge'
import http from "@/api/index";
import FastClick from 'fastclick' 
import './plugins/waves'
import './plugins/mini-ui'
import './plugins/vant'
import './directive/index'

import 'vant/lib/index.css';


Vue.prototype.$showToast = showToast
Vue.prototype.$openIndicator = openIndicator
Vue.prototype.$closeIndicator = closeIndicator
Vue.prototype.$showConfirm=showConfirm
Vue.prototype.$callPhone=callPhone
Vue.prototype.$smsPhone=smsPhone
Vue.prototype.$smsWechat=smsWechat
Vue.prototype.$smsQq=smsQq
Vue.prototype.$sendEmail=sendEmail
Vue.prototype.$clickUrl=clickUrl
Vue.prototype.$saveImage=saveImage
Vue.prototype.$mapNav=mapNav
Vue.prototype.$http=http;
Vue.prototype.$goBack=function(){
  this.$router.isBack=true;
  this.$router.go(-1);
}


// FastClick.attach(document.body);  // 引入fastclick并绑定到body 解决移动端点击响应延迟0.3s的问题
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
