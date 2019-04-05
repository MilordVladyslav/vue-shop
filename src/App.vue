<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue'
// import Items from './components/shop/Items.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}

</script>

<style lang="scss">
  @import './styles/style.scss';
</style>
