<template>
  <div class="wrapper">
    <div class="content">
      <div class="left-sidebar-wrapper">
        <LeftSidebar></LeftSidebar>
      </div>
      <MainContent ></MainContent>
      <div class="right-sidebar-wrapper">
        <RightSidebar></RightSidebar>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue'
import MainContent from './MainContent.vue'
import RightSidebar from './RightSidebar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Shop',
  computed: {
    ...mapGetters([
      'items'
    ])
  },
  components: {
    LeftSidebar,
    MainContent,
    RightSidebar
  }
}
</script>

<style scoped>

</style>
