<template>
  <v-card class="pa-1">
    <v-card-text>
      <strong>Plots Filter</strong>
      <p>(inputs go here)</p>
    </v-card-text>
  </v-card>
</template>

<script>
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'plots-filter',

    mixins: [valueBind],

    mounted() {
      this.mx_value = 'observationunits=Test Parameters'
    }
  }
</script>

<style lang="stylus"></style>