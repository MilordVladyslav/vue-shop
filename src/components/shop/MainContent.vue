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
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop +
            window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.$store.dispatch('getItems')
        }
      }
    },
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
    const requirements = {}
    for (let key in this.$router.history.current.query) {
      requirements[key] = this.$router.history.current.query[key] ? `this.$router.history.current.query[key` : ''
    }
    this.$store.dispatch('insertRequirements', requirements)
    this.$store.dispatch('getItems')
    this.scroll()
  },
  mounted: function () {
    this.appearanceImageStyle()
  }
}
</script>

<style scoped>

</style>
