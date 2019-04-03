import axios from 'axios'

const state = {
  items: [],
  requirements: {
    name: null,
    fromPrice: null,
    toPrice: null,
    gender: null,
    category: null,
    color: null,
    size: null
  },
  priceZone: []
}
const actions = {
  getItems ({ commit }) {
    axios.get(`/api/items/
    ${state.requirements.name}/
    ${state.requirements.fromPrice}/
    ${state.requirements.toPrice}/
    ${state.requirements.gender}/
    ${state.requirements.category}/
    ${state.requirements.color}/
    ${state.requirements.size}/
    `).then((response) => {
      let nextPackItems = []
      for (let i = 0; i < state.items.length + 10; i++) {
        if (response.data[i]) nextPackItems.push(response.data[i])
      }
      commit('UPDATE_ITEMS', nextPackItems)
    })
  },
  getPriceValues ({ commit }) {
    axios.get(`/api/items/pricevalues`).then((response) => {
      commit('UPDATE_PRICE_ZONE', response.data)
    })
  },
  insertRequirements ({ commit }, requirements) {
    console.log(requirements)
    commit('UPDATE_REQUIREMENTS', requirements)
  }
}

const mutations = {
  UPDATE_ITEMS (state, payload) {
    state.items = payload
  },
  UPDATE_REQUIREMENTS (state, payload) {
    state.requirements = payload
  },
  UPDATE_PRICE_ZONE (state, payload) {
    state.priceZone = payload
  }
}

const getters = {
  items: state => state.items,
  requirements: state => state.requirements,
  priceZone: state => state.priceZone
}

const itemModule = {
  state,
  mutations,
  getters,
  actions
}

export default itemModule
