import Vue from 'vue'
import Vuex from 'vuex'

import detailModule from './detailModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    detail: detailModule
  }
})
