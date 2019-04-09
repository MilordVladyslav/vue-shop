import axios from 'axios'

const state = {
  cartItems: []
}

const actions = {
  receiveCartItems ({ commit }) {
    axios.get('/api/cart').then(response => {
      commit('UPDATE_CART_ITEMS', response.data)
    })
  },
  sendCartItem ({ commit }, cartItem) {
    return axios.post('/api/cart', cartItem).then((response) => {
      console.log(response.data)
      commit('UPDATE_CART_ITEMS', response.data)
    })
  },
  clearAll ({ commit }) {
    axios.post('/api/cart/clearall').then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    })
  },
  removeItem ({ commit }, item) {
    return axios.post('/api/cart/removeitem', item).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    })
  }
}

const mutations = {
  UPDATE_CART_ITEMS (state, payload) {
    state.cartItems = payload
  }
}
const getters = {
  getCartItems: state => state.cartItems
}

const cartItems = {
  state,
  actions,
  mutations,
  getters
}

export default cartItems
