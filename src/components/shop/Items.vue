<template>
  <div>
    <div class="appearance-wrapper">
      <div class="appearance" id="appearance" @click="changeView">
        <div class="image" id="image"></div>
      </div>
    </div>
    <div :class="['items-wrapper', {'list': appearanceSettings.list}]">
      <Item v-for="item in items" :key="item.id" :item="item"></Item>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Items',
  computed: {
    ...mapGetters([
      'items',
      'requirements',
      'appearanceSettings'
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
    sayhi () {
      console.log('hello there')
    },
    changeView () {
      this.appearanceSettings.list = !this.appearanceSettings.list
      this.$store.dispatch('insertAppearanceSettings', this.appearanceSettings)
      this.appearanceImageStyle()
    },
    appearanceImageStyle () {
      const image = document.querySelector('#image')
      this.appearanceSettings.list === false
        ? image.style.transform = 'rotate(90deg)'
        : image.style.transform = 'rotate(0deg)'
    },
    receiveData () {
      const requirements = {}
      for (let key in this.$router.history.current.query) {
        requirements[key] = this.$router.history.current.query[key] ? `${this.$router.history.current.query[key]}` : ''
      }
      this.$store.dispatch('insertRequirements', requirements)
      this.$store.dispatch('getItems')
    }
  },
  watch: {
    '$route': 'receiveData'
  },
  created () {
    this.receiveData()
    this.scroll()
  },
  mounted: function () {
    this.appearanceImageStyle()
  }
}
</script>
<style scoped>

</style>
