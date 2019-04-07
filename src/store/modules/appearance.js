const state = {
  appearanceSettings: {
    list: false,
    sortParam: '',
    direction: 'down'
  },
  loading: true
}

const actions = {
  insertAppearanceSettings ({ commit }, newSettings) {
    commit('UPDATE_SETTINGS', newSettings)
  },
  changeLoadingStatus ({ commit }) {
    commit('UPDATE_LOADING', true)
  }
}
const mutations = {
  UPDATE_LOADING (state, payload) {
    console.log('hello from loading')
    state.loading = payload
  },
  UPDATE_SETTINGS (state, payload) {
    state.appearanceSettings = payload
  }
}
const getters = {
  appearanceSettings: state => state.appearanceSettings,
  loading: state => state.loading
}

const settingsModule = {
  state,
  mutations,
  getters,
  actions
}

export default settingsModule
