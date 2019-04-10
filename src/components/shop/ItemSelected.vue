<template>
  <div class="item-selected">
    <div class="history-back" @click="goBack"></div>
    <div class="parameters">

      <div class="picture">
        <img :src="require('../../assets/' + item.image_tag)">
      </div>
      <div class="description">
        <h3 class="item-title">{{ item.nameitem }}</h3>
        <p class="item-description">
          {{ item.description }}
        </p>
        <div class="item-parameters">
          <p> Gender: {{item.gender}} </p>
          <p> Category: {{item.category}} </p>
          <p> Color: {{item.color}} </p>
          <p> Size: {{item.size}} </p>
          <p class="price"> Price: <span> {{item.price}} </span></p>
        </div>
        <div class="add-to-cart" @click="sendItemsToAPI"> ToCart </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemSelected',
  computed: {
    item: function () {
      const item = {}
      item.description = this.$router.history.current.query.description
      for (let key in this.$router.history.current.params) {
        item[key] = this.$router.history.current.params[key] ? `${this.$router.history.current.params[key]}` : ''
      }
      return item
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    sendItemsToAPI () {
      const cartItem = {}
      for (let key in this.item) {
        cartItem[key] = this.item[key]
      }
      console.log(cartItem)
      this.$store.dispatch('sendCartItem', cartItem)
    }
  },
  created () {
    console.log(this.$router.history.current.name)
  }
}
</script>

<style scoped>

</style>
