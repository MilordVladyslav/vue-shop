<template>
  <header class="nav-bar">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.png" alt="vue shop" title="vue-shop">
        <h1><a href="/">Vue Shop</a></h1>
      </div>
      <div class="nav">
        <ul>
          <router-link to="/"><li><a href="#">Shop</a></li></router-link>
          <li><a href="#">About us</a></li>
          <li><a href="#">Our blog</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
