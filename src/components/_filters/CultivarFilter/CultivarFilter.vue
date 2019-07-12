<template>
  <v-card class="pa-1">
    <v-card-text :style="{ opacity: disabled ? 0.4 : 1 }">
      <strong>Cultivar Filter</strong>
      <p>(inputs go here)</p>
    </v-card-text>
  </v-card>
</template>

<script>
  import valueBind from '@/mixins/valueBind'
  
  export default {
    name: 'cultivar-filter',

    mixins: [valueBind],

    props: {
      disabled: Boolean
    },

    mounted() {
      this.mx_value = 'cultivars=Test Parameters'
    }
  }
</script>

<style lang="stylus">

</style>