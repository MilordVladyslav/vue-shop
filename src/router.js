import Vue from 'vue'
import Router from 'vue-router'
import Shop from './components/shop/Shop.vue'
import ItemSelected from './components/shop/ItemSelected'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Shop,
      children: [
        {
          path: '',
          name: 'items',
          component: () => import(/* webpackChunkName: "about" */ './components/shop/Items.vue')
        },
        {
          path: 'itemselected/:id/:nameitem/:description/:price/:category/:color/:image_tag/:gender/:size',
          name: 'itemselected',
          component: ItemSelected
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
