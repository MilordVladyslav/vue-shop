<template>
  <div id="app">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Content from './components/Content.vue'

export default {
  name: 'App',
  components: {
    Header,
    Content
  }
}

</script>

<style lang="scss">
  @import './styles/style.scss';
</style>
