<template>
  <div class="left-sidebar">
    <div class="form-wrapper">
      <form @submit="submitForm">
        <p>Name</p>
        <input type="text" id="item-name" class="item-name" name="name" v-model="requirements.name">
        <div id="slider" class="ranger"></div>
        <p class="from-price">From: <span id="from-price-place"></span></p>
        <p class="to-price">To: <span id="to-price-place"></span></p>
        <select name="gender" id="gender" class="gender select" v-model="requirements.gender">
          <option value="">Gender:</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="category" id="category" class="category select" v-model="requirements.category">
          <option value="" >Category:</option>
          <option value="Shirt">Shirt</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Skirt">Skirt</option>
          <option value="Jeans">Jeans</option>
        </select>
        <select name="color" id="color" class="color select" v-model="requirements.color">
          <option value="" selected>Color:</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Red">Red</option>
        </select>
        <select name="size" id="size" class="size select" v-model="requirements.size">
          <option value="">Size:</option>
          <option value="M">M</option>
        </select>
        <button class="search"> Search </button>
      </form>
      <p class="clear-filters" @click="clearFilters">Clear Filters</p>
    </div>
  </div>
</template>

<script>
import * as noUiSlider from '../../../node_modules/nouislider/distribute/nouislider.min.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LeftSidebar',
  data: function () {
    return {
      requirements: {
        name: '',
        fromPrice: '',
        toPrice: '',
        gender: '',
        category: '',
        color: '',
        size: ''
      }
    }
  },
  created () {
    this.$store.dispatch('getPriceValues')
  },
  computed: {
    ...mapGetters([
      'items',
      'priceZone'
    ]),
    ...mapActions([
      'insertRequirements'
    ])
  },
  methods: {
    clearFilters () {
      this.requirements = {
        name: '',
        fromPrice: '',
        toPrice: '',
        gender: '',
        category: '',
        color: '',
        size: ''
      }
    },
    goShopItemsMobile () {
      if (window.innerWidth <= 1050) {
        this.$router.push({ path: '/' })
      }
    },
    goBack () {
      if (this.$router.history.current.name === 'itemselected' && window.history.length > 1) this.$router.go(-1)
    },
    submitForm (evt) {
      evt.preventDefault()
      this.goBack()
      this.goShopItemsMobile()
      this.requirements.fromPrice = document.querySelector('#from-price-place').innerHTML
      this.requirements.toPrice = document.querySelector('#to-price-place').innerHTML
      this.$router.push({
        query: {
          name: this.requirements.name ? `${this.requirements.name}` : '',
          fromPrice: this.requirements.fromPrice ? `${this.requirements.fromPrice}` : '',
          toPrice: this.requirements.toPrice ? `${this.requirements.toPrice}` : '',
          gender: this.requirements.gender ? `${this.requirements.gender}` : '',
          category: this.requirements.category ? `${this.requirements.category}` : '',
          color: this.requirements.color ? `${this.requirements.color}` : '',
          size: this.requirements.size ? `${this.requirements.size}` : ''
        }
      })
      console.log(this.requirements)
      this.$store.dispatch('changeLoadingStatus')
      this.$store.dispatch('insertRequirements', this.requirements)
      this.$store.dispatch('getItems')
    }
  },
  mounted: function () {
    let slider = document.getElementById('slider')
    setTimeout(() => {
      let min = this.priceZone.fromPrice
      let max = this.priceZone.toPrice
      noUiSlider.create(slider, {
        start: [min, max],
        connect: true,
        range: {
          'min': min,
          'max': max
        }
      })
      slider.noUiSlider.on('update', function (values, handle) {
        document.querySelector('#from-price-place').innerHTML = Math.floor(values[0])
        document.querySelector('#to-price-place').innerHTML = Math.floor(values[1])
      })
    }, 300)
  }
}
</script>

<style scoped>

</style>
