<template>
  <v-container fluid grid-list-md fill-height class="grey lighten-4">
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
              color="grey"
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
              label="Add Parameter"
              :items="filters"
              :disabled="!season"
              @change="handleAddFilter"/>
          </v-flex>
        </v-layout>

        <v-btn block flat @click="handleClear">Clear Parameters</v-btn>
        <v-btn 
          block
          color="green"
          dark
          large
          :loading="loadingSearch"
          @click="handleSearch">Run Search</v-btn>
      </form>
    </v-navigation-drawer>

    <v-layout column>
       <v-flex shrink class="preview-query text-xs-center mb-3">
         <v-card>
           <v-card-title class="grey--text darken-3">
             <strong>QUERY: </strong>https://search-api-dev.workbench.terraref.org/search-api/v1/search?{{ getParams }}
           </v-card-title>
         </v-card>
      </v-flex>

      <v-flex grow v-if="filteredResults && !loadingSearch">
        <standard-results-table
          v-for="(val, key) in filteredResults"
          :key="key"
          :title="key.toUpperCase()"
          :results="val"/>
      </v-flex>

      <v-layout 
        v-else
        fill-height
        justify-center
        align-center
        class="headline grey--text">

        <v-progress-circular
          v-if="loadingSearch"
          indeterminate
          size="70"
          color="primary">
        </v-progress-circular>

        <v-layout 
          v-else-if="(response && !filteredResults) || error" 
          align-items
          justify-center>
          <v-icon class="mr-3" large>error_outline</v-icon> Sorry, that query returned an empty data set
        </v-layout>

        <div v-else>Run Search for full results...</div>
        <!-- TODO: empty results -->
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  import SeasonSelector from '@/components/_filters/SeasonSelector/SeasonSelector'
  import ProductSelector from '@/components/_filters/ProductSelector/ProductSelector'
  import CultivarFilter from '@/components/_filters/CultivarFilter/CultivarFilter'
  import TreatmentFilter from '@/components/_filters/TreatmentFilter/TreatmentFilter'
  import PlotFilter from '@/components/_filters/PlotFilter/PlotFilter'
  import StandardResultsTable from '@/components/StandardResultsTable/StandardResultsTable'

  import { mainSearch } from '@/api'

  import isEmpty from 'lodash.isempty'

  export default {
    name: 'home',

    components: {
      CultivarFilter,
      PlotFilter,
      ProductSelector,
      SeasonSelector,
      TreatmentFilter,
      StandardResultsTable
    },

    data() {
      return {
        error: false,
        drawer: true,
        season: '',
        addFilter: '', // v-model for add filter dropdown
        addedFilters: [], // filters added, used for dynamic components
        filterValues: {},
        response: '',
        loadingSearch: false
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
      getParams() {
        const values = this.filterValues
        const params = this.addedFilters.concat('SeasonSelector').map(f => values[f]).join('&')

        return params
      },
      filteredResults() {
        const results = {}

        for(const key in this.response) {
          if (this.response[key].length) {
            results[key] = this.response[key]
          }
        }

        return !isEmpty(results) ? results : ''
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
      },
      async handleSearch() {
        try {
          this.error = false
          this.loadingSearch = true
          const response = await mainSearch(this.getParams)
          this.response = response
        } catch (e) {
          this.error = true
          console.error(e)
        } finally {
          this.loadingSearch = false
        }
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

