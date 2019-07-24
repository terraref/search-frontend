<template>
  <v-card class="pa-1">
    <v-card-text>
      <h3 class="mb-1">Cultivars:</h3>
      <v-progress-circular
        indeterminate
        class="ma-0"
        color="primary"
        v-if="loading"/>
      <v-select 
        v-else
        label="Please select cultivar"
        :items="cultivars"
        v-model="cultivar"
        single-line
        hide-details
        outline
        :disabled="disabled"
        @change="handleChange"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { cultivars } from '@/api'
  import valueBind from '@/mixins/valueBind'

  import uniq from 'lodash.uniq'

  export default {
    name: 'cultivar-selector',

    mixins: [valueBind],

    mounted() {
      this.loading = true

      cultivars(this.params)
        .then(results => {
          this.cultivars = (uniq(results.sort()))
          this.cultivar = this.cultivars[0]

          this.handleChange(this.cultivar)

          this.loading = false
        })
        .catch(e => { 
          this.loading = false
          console.error(e)
        })
    },

    props: {
      disabled: Boolean,
      params: String
    },

    data() {
      return {
        loading: false,
        cultivars: [],
        cultivar: ''
      }
    },

    methods: {
      handleChange(val) {
        this.mx_value = `germplasmName=${val}`
      }
    }
  }
</script>

<style lang="stylus"></style>
