<template>
  <div class="item">
    <div class="product-picture">
      <img :src="require('../assets/' + item.image_tag)">
      <!--:src="require('../../assets/' + productItem.image_tag)-->
    </div>
    <div class="description-price">
      <div class="description">
        <h3 class="name">{{ item.name }}</h3>
        <p class="short-desc">{{ item.description }}</p>
      </div>
      <div class="price-cart-block">
        <p class="price">${{item.price}}</p>
        <p>ToCart</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item']
}
</script>

<style scoped>

</style>
