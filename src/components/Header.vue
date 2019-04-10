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
      <div class="mobile-nav-trigger" id="mobile-nav-trigger" @click="OpenNav">
      </div>
    </div>
    <div class="mobile-nav-slide" id="mobile-nav-slide">
      <div class="close-slide" id="close-slide" @click="CloseNav"></div>
      <ul class="nav-items" @click="CloseNav">
        <li class="nav-item"><router-link to="/">Shop</router-link></li>
        <li class="nav-item"><router-link to="/filters">Filters</router-link></li>
        <li class="nav-item"><router-link to="/cart">Cart</router-link></li>
        <li class="nav-item"><router-link to="/blog">Our Blog</router-link></li>
        <li class="nav-item"><router-link to="/about">About Us</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    OpenNav () {
      document.querySelector('#mobile-nav-slide').classList.add('open')
    },
    CloseNav () {
      document.querySelector('#mobile-nav-slide').classList.remove('open')
    }
  }
}
</script>

<style scoped>

</style>
