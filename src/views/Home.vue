<template>
  <v-container fluid grid-list-md fill-height class="white">
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
            :disabled="!!addedParameters.length"
            :params-sync="getParameterParams('SeasonSelector')"
            @update:params-sync="(val) => { handleParameterChange(val, 'SeasonSelector') }"
            class="mb-3"></season-selector>
        </div>

        <v-divider class="mb-3"></v-divider>

        <template v-for="(parameterName, index) in addedParameters">
          <div class="selector__wrapper mb-3" :key="`${parameterName}-${index}`">
            <component 
              :is="parameterName"
              :query="getParamsAsString"
              :disabled="(addedParameters.length - 1) > index"
              :params-sync="getParameterParams(parameterName)"
              @update:params-sync="(val) => { handleParameterChange(val, parameterName) }">
            </component>
            <v-btn
              fab
              small
              color="grey"
              class="elevation-1"
              @click="handleRemoveParameter(parameterName)">
              <v-icon color="white" small>close</v-icon>
            </v-btn>
          </div>
        </template>

        <v-layout>
          <v-flex xs6 offset-xs6 align-end>
            <v-select
              v-model="addParameter"
              single-line
              outlined
              append-icon="add"
              label="Add Parameter"
              :items="parameterList"
              :disabled="!showParameterList"
              @change="handleAddParameter"/>
          </v-flex>
        </v-layout>

        <v-btn block text @click="handleClear">Clear Parameters</v-btn>
        <v-btn 
          block
          dark
          color="primary"
          large
          :loading="loadingSearch"
          @click="handleSearch">Run Search</v-btn>
      </form>
    </v-navigation-drawer>

    <v-layout column>
       <v-flex shrink class="text-xs-center mb-3">
         <v-card>
           <v-card-text>
             <strong>QUERY: </strong>https://search-api-dev.workbench.terraref.org/search-api/v1/search?{{ getParamsAsString }}
           </v-card-text>
         </v-card>
      </v-flex>

      <v-flex grow v-if="filteredResults && !loadingSearch && !error">
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

  import qs from 'qs'
  import omitBy from 'lodash.omitby'
  import isEmpty from 'lodash.isempty'
  import reduce from 'lodash.reduce'
  import uniq from 'lodash.uniq'

  export default {
    name: 'home',

    mounted() {
      const {
        query = {}
      } = this.$route

      let paramsToAdd = []

      if (!isEmpty(query)) {
        for (const name in this.parameters) {
          for (const key in query) {
            if (this.parameters[name].params.hasOwnProperty(key)) {
              this.$set(this.parameters[name].params, key, query[key])

              paramsToAdd.push(name)
            }
          }
        }

        uniq(paramsToAdd).forEach(p => {
          this.handleAddParameter(p)
        })

        if (query.initialize == 1) {
          this.$nextTick(() => {
            this.handleSearch()
          })
        }
      }
    },

    components: {
      CultivarFilter,
      PlotFilter,
      ProductSelector,
      SeasonSelector,
      TreatmentFilter,
      StandardResultsTable
    },

    watch: {
      // write the params as a query string to browser URL
      getParams(val) {
        const params = this.addedParameters.length
          ? {
            ...val,
            initialize: 1
          }
          : { ...val }

        this.$router.replace({ query: params })
      }
    },

    data() {
      return {
        error: false,
        drawer: true,
        addParameter: '', // v-model for add parameter menu
        addedParameters: [], // parameters added, used for dynamic <component>
        // manifest of available parameters and their properties and params
        parameters: {
          SeasonSelector: {
            text: 'Seasons',
            value: 'SeasonSelector', // component
            disabledPredicate: () => {
              return false
            },
            disabled: false,
            params: {
              season: '',
              start_date: '',
              end_date: ''
            }
          },
          ProductSelector: {
            text: 'Products',
            value: 'ProductSelector',
            disabledPredicate: () => {
              return this.addedParameters.includes('ProductSelector')
            },
            disabled: false,
            params: {
              product: ''
            }
          },
          CultivarFilter: {
            text: 'Cultivars',
            value: 'CultivarFilter',
            disabledPredicate: () => {
              return this.addedParameters.includes('CultivarFilter')
            },
            disabled: false,
            params: {
              germplasmName: ''
            }
          }
        },
        response: '',
        loadingSearch: false
      }
    },

    computed: {
      /**
       * Return this.parameter list without SeasonSelector
       * and invoke the disabledPredicate and assign value to disabled
       * disabled value is used for Parameter menu
       */
      parameterList() {
        return reduce(this.parameters, (result, value, key) => {
          if (key === 'SeasonSelector') return result

          value.disabled = value.disabledPredicate()

          return result.concat(value)
        }, [])
      },
      getParams() {
        /**
         * Loops through this.parameters and extracts this.parameter[name].params
         * omits any empty values and stringifies it with qs library
         */
        let params = Object.values(this.parameters)
          .reduce((o, v) => {
            const omitEmptyParams = omitBy(v.params, v => v == '')
            return {
              ...o, ...omitEmptyParams
            }
          }, {})

        return params
      },
      getParamsAsString() {
        return qs.stringify(this.getParams)
      },
      /**
       * Conditionals for disabled Parameter menu
       */
      showParameterList() {
        return !!this.parameters['SeasonSelector'].params.season
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
      getParameterParams(name) {
        const {
          [name]: {
            params = {}
          } = {}
        } = this.parameters

        return params
      },
      handleParameterChange(val, parameterName) {
        this.parameters[parameterName].params = val
      },
      handleClear() {
        this.addedParameters.slice().forEach(parameterName => {
          console.log(parameterName)
          this.handleRemoveParameter(parameterName)
        })

        this.response = ''
      },
      handleRemoveParameter(parameterName) {
        const {
          [parameterName]: {
            params = {}
          } = {}
        } = this.parameters

        for (const name in params) {
          params[name] = ''
        }

        const idx = this.addedParameters.findIndex(f => f === parameterName)
        console.log(idx)
        this.addedParameters.splice(idx, 1)
      },
      handleAddParameter(val) {
        if (val === 'SeasonSelector') return
        // reset dropdown
        this.$nextTick(() => {
          this.addParameter = ''
        })

        this.addedParameters.push(val)
      },
      async handleSearch() {
        try {
          this.error = false
          this.loadingSearch = true
          const response = await mainSearch(this.getParamsAsString)
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

<style lang="sass">
  .query__wrapper
    max-width: 600px
    margin: 0 auto

    .v-input--is-disabled
      opacity: .5

  .selector__wrapper
    position: relative

    .v-btn
      position: absolute
      right: -5px
      top: -5px
      width: 25px !important
      height: 25px !important
</style>

