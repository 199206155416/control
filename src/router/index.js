import Vue from 'vue'
import VueRouter from 'vue-router'
import formRoutes from './formRoutes'

Vue.use(VueRouter)

const routes = [
 ...formRoutes
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {  //解决路由切换滚动条继承上个页面滚动条的问题
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
    }
})

export default router
