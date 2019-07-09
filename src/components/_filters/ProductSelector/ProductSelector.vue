<template>
  <v-card class="pa-1">
    <!-- <v-card-title primary-title>
      <h2>Please select product:</h2>
    </v-card-title> -->

    <v-card-text>
      <v-progress-circular
        indeterminate
        class="ma-3"
        color="primary"
        v-if="loading"/>
      <v-select 
        v-else
        label="Please select product"
        :items="products"
        v-model="product"
        single-line
        hide-details
        outline
        :disabled="disabled"
        @change="handleChange"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'product-selector',

    mixins: [valueBind],

    props: {
      disabled: Boolean
    },

    data() {
      return {
        loading: false,
        products: [
          'RGB GeoTIFFs',
          'Thermal IR GeoTIFFs',
          'Laser Scanner 3D LAS',
          'Full Field RGB images',
          'Full Field IR images',
          'Canopy Cover',
          'Mean Temperature',
          'Canopy Height'
        ],
        product: ''
      }
    },

    methods: {
      handleChange(val) {
        this.mx_value = `product=${val}`
      }
    }
  }
</script>

<style lang="stylus"></style>
