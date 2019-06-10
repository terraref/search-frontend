<template>
  <v-container fluid fill-height class="grey lighten-4">
    <v-navigation-drawer
      app
      stateless
      clipped
      touchless
      disable-route-watcher
      v-model="drawer"
      role="complimentary"
      style="z-index: 2"
      width="380">
      <form class="query__wrapper pa-3" novalidate>
        <season-selector @input="handleSeasonSelect" class="mb-3"></season-selector>

        <v-divider class="mb-3"></v-divider>

        <template v-for="(filter, index) in addedFilters">
          <component :is="filter" :key="`${filter}-${index}`" class="mb-3"></component>
        </template>

        <v-layout>
          <v-flex xs6 offset-xs6 align-end>
            <v-select
              v-model="addFilter"
              single-line
              outline
              append-icon="add"
              label="Add Filter"
              :items="filters"
              :disabled="!season"
              @change="handleAddFilter"/>
          </v-flex>
        </v-layout>

        <v-btn block flat @click="handleClear">Clear Filters</v-btn>
        <v-btn block color="green" dark large>Run Search</v-btn>
      </form>
    </v-navigation-drawer>

    <preview-results></preview-results>

    <v-layout fill-height justify-center align-center class="headline grey--text">
      Submit query for full results...
    </v-layout>
  </v-container>
</template>

<script>
  import SeasonSelector from '@/components/_filters/SeasonSelector/SeasonSelector'
  import ProductSelector from '@/components/_filters/ProductSelector/ProductSelector'
  import CultivarFilter from '@/components/_filters/CultivarFilter/CultivarFilter'
  import TreatmentFilter from '@/components/_filters/TreatmentFilter/TreatmentFilter'
  import PlotFilter from '@/components/_filters/PlotFilter/PlotFilter'
  import PreviewResults from '@/components/PreviewResults/PreviewResults'

  export default {
    name: 'home',

    components: {
      CultivarFilter,
      PlotFilter,
      PreviewResults,
      ProductSelector,
      SeasonSelector,
      TreatmentFilter
    },

    data() {
      return {
        drawer: true,
        season: '',
        addFilter: '', // v-model for add filter dropdown
        addedFilters: [] // filters added, used for dynamic components
      }
    },

    computed: {
      filters() {
        return [
          { text: 'Products', value: 'ProductSelector', disabled: this.addedFilters.includes('ProductSelector') },
          { text: 'Cultivars', value: 'CultivarFilter', disabled: this.addedFilters.includes('CultivarFilter') },
          { text: 'Treaments', value: 'TreatmentFilter', disabled: this.addedFilters.includes('TreatmentFilter') },
          { text: 'Plots', value: 'PlotFilter', disabled: this.addedFilters.includes('PlotFilter') }
        ]
      }
    },

    methods: {
      handleSeasonSelect(val) {
        this.season = val
      },
      handleClear() {
        this.addedFilters = []
      },
      handleAddFilter(val) {
        // reset dropdown
        this.$nextTick(() => {
          this.addFilter = ''
        })

        this.addedFilters.push(val)
      },
      loadComponent(filter) {
        return import(`@/components/_filters/${filter}/${filter}`)
      }
    }
  }
</script>

<style lang="stylus">
  .query__wrapper
    max-width: 600px
    margin: 0 auto

    .v-input--is-disabled
      opacity: .5
</style>

