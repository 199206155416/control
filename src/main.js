import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "@/api/index"
import map from "@/api/map"
import FastClick from 'fastclick'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import '@/utils/jsBridge'
import './plugins/waves'
import './plugins/mini-ui'
import './plugins/vant'
import './directive/copy'
import 'vant/lib/index.css'

Vue.prototype.$http = http;
Vue.prototype.$map = map;
Vue.prototype.$goBack = function () {
  this.$router.isBack = true;
  this.$router.go(-1);
}

FastClick.attach(document.body);  // 引入fastclick并绑定到body 解决移动端点击响应延迟0.3s的问题
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
