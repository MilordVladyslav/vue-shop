<template>
  <div class="main-content">
    <div class="appearance" id="appearance" @click="changeView">
      <div class="image" id="image"></div>
    </div>
    <div :class="['items-wrapper', {'list': list}]">
        <Item v-for="item in items" :key="item.id" :item="item"></Item>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'MainContent',
  data: () => {
    return {
      list: false
    }
  },
  computed: {
    ...mapGetters([
      'items',
      'requirements'
    ])
  },
  components: {
    Item
  },
  methods: {
    changeView () {
      this.list = !this.list
      this.appearanceImageStyle()
    },
    appearanceImageStyle () {
      const image = document.querySelector('#image')
      this.list === false
        ? image.style.transform = 'rotate(90deg)'
        : image.style.transform = 'rotate(0deg)'
    }
  },
  created () {
    this.$store.dispatch('getItems')
  },
  mounted: function () {
    this.appearanceImageStyle()
  }
}
</script>

<style scoped>

</style>
