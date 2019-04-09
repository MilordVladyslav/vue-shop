<template>
  <div class="right-sidebar">
    <h2>Your Cart</h2>
    <div class="cart-items-wrapper">
      <CartItem v-for="cartItem in getCartItems" :key="cartItem.id" :cartItem="cartItem"></CartItem>
    </div>
    <div class="total-values">
      <p class="total-price">total price: <span>$ {{totalPrice}} </span></p>
      <p class="clear-all" @click="clearAll">Clear cart</p>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem'
import { mapGetters } from 'vuex'
export default {
  name: 'RightSidebar',
  components: {
    CartItem
  },
  methods: {
    clearAll () {
      this.$store.dispatch('clearAll')
    }
  },
  computed: {
    ...mapGetters([
      'getCartItems'
    ]),
    totalPrice () {
      let totalPrice = 0
      for (let key in this.getCartItems) {
        totalPrice += this.getCartItems[key].price * this.getCartItems[key].quantity
      }
      return totalPrice
    }
  },
  created () {
    this.$store.dispatch('receiveCartItems')
  }
}
</script>

<style scoped>

</style>
