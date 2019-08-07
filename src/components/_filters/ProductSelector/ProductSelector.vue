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
        outlined
        :disabled="disabled"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { products } from '@/api'
  import paramsSync from '@/mixins/paramsSync'

  import uniq from 'lodash.uniq'

  export default {
    name: 'product-selector',

    mixins: [paramsSync],

    watch: {
      product(val) {
        this.$emit('update:params-sync', {
          product: val
        })
      }
    },

    mounted() {
      this.loading = true

      products(this.query)
        .then(results => {
          this.products = (uniq(results.sort()))

          // set a default if value isn't already set
          if (!this.product) {
            this.product = this.products[0]
          }

          this.loading = false
        })
        .catch(e => { 
          this.loading = false
          console.error(e)
        })
    },

    props: {
      disabled: Boolean,
      query: String
    },

    data() {
      return {
        loading: false,
        products: [],
        product: ''
      }
    }
  }
</script>

<style lang="sass"></style>
