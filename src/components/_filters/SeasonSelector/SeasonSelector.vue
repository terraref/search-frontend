<template>
  <v-card class="pa-1">
    <!-- <v-card-title primary-title>
      <h2>Please select season:</h2>
    </v-card-title> -->

    <v-card-text>
      <v-progress-circular
        indeterminate
        class="ma-3"
        color="primary"
        v-if="loading"/>
      <v-select 
        v-else
        :items="seasons"
        v-model="season"
        label="Please select season"
        hide-details
        single-line
        outline
        @change="handleChange"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { seasons } from '@/api/'
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'season-selector',

    mixins: [valueBind],

    created() {
      this.loading = true

      seasons()
        .then(results => {
          this.seasons = results
          this.loading = false
        })
        .catch(e => { 
          this.loading = false
          console.error(e)
        })
    },

    data() {
      return {
        loading: false,
        seasons: [],
        season: ''
      }
    },

    methods: {
      handleChange(val) {
        this.mx_value = val
      }
    }
  }
</script>

<style lang="stylus"></style>
