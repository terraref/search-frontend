<template>
  <v-container fluid grid-list-lg fill-height class="grey lighten-4">
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
        <div class="selector__wrapper">            
          <season-selector 
            :disabled="!!addedFilters.length"
            @input="handleSeasonSelect"
            class="mb-3"></season-selector>
        </div>

        <v-divider class="mb-3"></v-divider>

        <template v-for="(filter, index) in addedFilters">
          <div class="selector__wrapper mb-3" :key="`${filter}-${index}`">
            <component :is="filter" :disabled="(addedFilters.length - 1) > index" @input="(val) => { handleFilterChange(val, filter) }"></component>
            <v-btn
              icon
              small
              color="red"
              class="elevation-1"
              @click="handleRemoveFilter(filter)">
              <v-icon color="white" small>clear</v-icon>
            </v-btn>
          </div>
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

    <preview-results>
      <template #default>
        {{ buildQuery }}
      </template>
    </preview-results>

    <v-layout fill-height justify-center align-center class="headline grey--text">
      Run Search for full results...
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
        addedFilters: [], // filters added, used for dynamic components
        filterValues: {}
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
      },
      buildQuery() {
        const baseUrl = 'https://search-api-dev.workbench.terraref.org/search-api/v1/search?'
        const values = this.filterValues
        const params = this.addedFilters.concat('SeasonSelector').map(f => values[f]).join('&')

        return `${baseUrl}${params}`
      }
    },

    methods: {
      handleFilterChange(val, filterName) {
        this.$set(this.filterValues, filterName, val)
      },
      handleSeasonSelect(val) {
        this.season = val
        this.$set(this.filterValues, 'SeasonSelector', val)
      },
      handleClear() {
        this.addedFilters = []

        const {
          SeasonSelector,
        } = this.filterValues
        this.filterValues = { SeasonSelector }
      },
      handleRemoveFilter(filter) {
        const idx = this.addedFilters.findIndex(f => f === filter)
        this.addedFilters.splice(idx, 1)

        const {
          [filter]: type,
          ...rest
        } = this.filterValues

        this.filterValues = rest
      },
      handleAddFilter(val) {
        // reset dropdown
        this.$nextTick(() => {
          this.addFilter = ''
        })

        this.addedFilters.push(val)
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

  .selector__wrapper
    position: relative

    .v-btn
      position: absolute
      right: -15px
      top: -15px
      width: 20px !important
      height: 20px !important
</style>

