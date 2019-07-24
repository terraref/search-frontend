<template>
  <v-card class="pa-1">
    <v-card-text>
      <h3 class="mb-1">Products:</h3>
      <v-progress-circular
        indeterminate
        class="ma-0"
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
  import { products } from '@/api'
  import valueBind from '@/mixins/valueBind'

  import uniq from 'lodash.uniq'

  export default {
    name: 'product-selector',

    mixins: [valueBind],

    mounted() {
      this.loading = true

      products()
        .then(results => {
          this.products = (uniq(results.sort()))
          this.product = this.products[0]

          this.handleChange(this.product)

          this.loading = false
        })
        .catch(e => { 
          this.loading = false
          console.error(e)
        })
    },

    props: {
      disabled: Boolean
    },

    data() {
      return {
        loading: false,
        products: [],
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
