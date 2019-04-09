<template>
  <div class="item">
    <router-link :to="{
      name: 'itemselected',
      params: {
      id: item.id,
      nameitem:item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      color: item.color,
      image_tag: item.image_tag,
      gender: item.gender,
      size: item.size
      }}">
    <div class="product-picture">
      <img :src="require('../../assets/' + item.image_tag)">
    </div>
    </router-link>
    <div class="description-price">
      <div class="description">
        <h3 class="name">
          <router-link :to="{
            name: 'itemselected',
            params: {
            id: item.id,
            nameitem:item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            color: item.color,
            image_tag: item.image_tag,
            gender: item.gender,
            size: item.size
            }}">
            {{item.name}}
          </router-link>
        </h3>
        <p class="short-desc">
          <router-link :to="{
            name: 'itemselected',
            params: {
            id: item.id,
            nameitem:item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            color: item.color,
            image_tag: item.image_tag,
            gender: item.gender,
            size: item.size
            }}">
          {{item.description}}
          </router-link>
        </p>
      </div>
      <div class="price-cart-block">
        <p class="price">$ {{item.price}}</p>
        <p class="size">Size:{{item.size}}</p>
        <router-link :to="{
        name: 'itemselected',
        params: {
        id: item.id,
        nameitem:item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        color: item.color,
        image_tag: item.image_tag,
        gender: item.gender,
        size: item.size
        }}">more...</router-link>
      </div>
      <div class="to-cart-block">
        <div class="img-wrapper">
          <p @click="sendItemsToAPI">toCart</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item'],
  methods: {
    sendItemsToAPI () {
      const cartItem = {}
      for (let key in this.item) {
        cartItem[key] = this.item[key]
      }
      console.log(cartItem)
      this.$store.dispatch('sendCartItem', cartItem)
    }
  }
}
</script>

<style scoped>

</style>
