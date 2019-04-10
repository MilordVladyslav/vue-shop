<template>
  <div class="cart-item">
    <div class="cart-picture">
    <router-link :to="{
      name: 'itemselected',
      params: {
      id: cartItem.id,
      nameitem: cartItem.name,
      description: cartItem.description,
      price: cartItem.price,
      category: cartItem.category,
      color: cartItem.color,
      image_tag: cartItem.image_tag,
      gender: cartItem.gender,
      size: cartItem.size
      }}">
      <img :src="require('../../assets/' + cartItem.image_tag)">
    </router-link>
    </div>
    <div class="cart-description">
      <div class="high-params">
        <h3 class="name">
          <router-link :to="{
            name: 'itemselected',
            params: {
            id: cartItem.id,
            nameitem: cartItem.name,
            description: cartItem.description,
            price: cartItem.price,
            category: cartItem.category,
            color: cartItem.color,
            image_tag: cartItem.image_tag,
            gender: cartItem.gender,
            size: cartItem.size
            }}">
            {{cartItem.name}}
          </router-link>
        </h3>
        <div class="remove-item" @click="removeItem">
        </div>
      </div>
      <div class="parameters">
        <p class="price">$ {{cartItem.price}}</p>
        <p class="amount">Amount: {{cartItem.quantity}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem.vue',
  props: ['cartItem'],
  methods: {
    removeItem () {
      this.$store.dispatch('removeItem', this.cartItem)
    }
  }
}
</script>

<style scoped>

</style>
