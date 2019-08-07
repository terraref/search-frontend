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
        v-model="germplasmName"
        single-line
        hide-details
        outlined
        :disabled="disabled"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import { cultivars } from '@/api'
  import paramsSync from '@/mixins/paramsSync'

  import uniq from 'lodash.uniq'

  export default {
    name: 'cultivar-selector',

    mixins: [paramsSync],

    watch: {
      germplasmName(val) {
        this.$emit('update:params-sync', {
          germplasmName: val
        })
      }
    },

    mounted() {
      this.loading = true

      cultivars(this.query)
        .then(results => {
          this.cultivars = (uniq(results.sort()))
          
          // set a default if value isn't already set
          if (!this.germplasmName) {
            this.germplasmName = this.cultivars[0]
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
        cultivars: [],
        germplasmName: ''
      }
    }
  }
</script>

<style lang="sass"></style>
