<template>
  <div class="item">
    <div class="product-picture">
      <img :src="require('../../assets/' + item.image_tag)">
      <!--:src="require('../../assets/' + productItem.image_tag)-->
    </div>
    <div class="description-price">
      <div class="description">
        <h3 class="name">{{item.name}}</h3>
        <p class="short-desc">{{item.description}}</p>
      </div>
      <div class="price-cart-block">
        <p class="price">{{item.price}}</p>
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
        <!--itemselected/:id/:name/:description/:price/:category/:color/:image_tag/:gender/:size-->
      </div>
    </div>
  </div>
</template>
<!--"id": 23,
    "name": "sunt in culpa",
    "description": "lorem ipsum super description awesome vue",
    "price": 63,
    "category": "Jeans",
    "inStore": 7,
    "color": "Red",
    "image_tag": "bb7fd79c08196d17d0c16868593b5607.jpg",
    "gender": "Female",
    "size": "M"-->

<script>
export default {
  name: 'Item',
  props: ['item'],
  created () {
  }
}
</script>

<style scoped>

</style>
