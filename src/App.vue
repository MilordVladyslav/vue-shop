<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue'
// import Shop from './components/shop/Shop.vue'

export default {
  name: 'App',
  components: {
    Header
    // Shop
  }
}

</script>

<style lang="scss">
  @import './styles/style.scss';
</style>
