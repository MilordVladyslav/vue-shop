const state = {
  appearanceSettings: {
    list: false,
    sortParam: '',
    direction: 'down'
  }
}

const actions = {
  insertAppearanceSettings ({ commit }, newSettings) {
    commit('UPDATE_SETTINGS', newSettings)
  }
}
const mutations = {
  UPDATE_SETTINGS (state, payload) {
    state.appearanceSettings = payload
  }
}
const getters = {
  appearanceSettings: state => state.appearanceSettings
}

const settingsModule = {
  state,
  mutations,
  getters,
  actions
}

export default settingsModule
