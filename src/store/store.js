import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import settings from './modules/appearance'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    items,
    settings
  }
})
