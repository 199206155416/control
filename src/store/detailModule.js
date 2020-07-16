const detailModule = {
  state: () => ({
    copy: false,
    hidden_number: false,
  }),
  mutations: {
    changeCopy(state, bool) {
      state.copy = !!bool
    },

    changeHiddenNumber(state, bool) {
      state.hidden_number = !!bool
    }
  },
  actions: {

  },
  getters: {

  }
}

export default detailModule