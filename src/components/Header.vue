<template>
  <header class="nav-bar">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.png" alt="vue shop" title="vue-shop">
        <h1><a href="/">Vue Shop</a></h1>
      </div>
      <div class="nav">
        <ul>
          <li><router-link to="/">Shop</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/blog">Our Blog</router-link></li>
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
