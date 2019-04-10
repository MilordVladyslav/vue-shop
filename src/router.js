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
          component: () => import('./components/shop/Items.vue')
        },
        {
          path: 'itemselected/:id/:nameitem/:description/:price/:category/:color/:image_tag/:gender/:size',
          name: 'itemselected',
          component: ItemSelected
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/shop/RightSidebar.vue')
    },
    {
      path: '/filters',
      name: '/filters',
      component: () => import('./components/shop/LeftSidebar.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./components/about_us/AboutUs.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./components/blog/Blog.vue')
    }
  ]
})
