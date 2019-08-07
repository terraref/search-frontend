<template>
  <v-card class="pa-1">
    <v-card-text :style="{ opacity: disabled ? 0.4 : 1 }">
      <strong>Plots Filter</strong>
      <p>(inputs go here)</p>
    </v-card-text>
  </v-card>
</template>

<script>
  // TODO: need to be refactor to meet requirements for "param syncing"
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'plots-filter',

    mixins: [valueBind],

    props: {
      disabled: Boolean
    },

    mounted() {
      this.mx_value = {
        observationunits: 'Test Parameters'
      }
    }
  }
</script>

<style lang="sass"></style>