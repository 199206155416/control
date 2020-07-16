const detailModule = {
  state: () => ({
    copy: false,
    hidden_number: false,
    edit: false
  }),
  mutations: {
    changeCopy(state, bool) {
      state.copy = !!bool
    },

    changeHiddenNumber(state, bool) {
      state.hidden_number = !!bool
    },

    changeEdit(state, bool) {
      state.edit = !!bool
    }
  },
  actions: {

  },
  getters: {

  }
}

export default detailModule