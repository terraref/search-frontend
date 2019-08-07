<template>
  <v-card class="pa-1">
    <!-- <v-card-title primary-title>
      <h2>Please select season:</h2>
    </v-card-title> -->

    <v-card-text>
      <h3 class="mb-1">Seasons:</h3>
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
        outlined
        class="mb-3"
        :disabled="disabled"
        @change="handleSeasonChange"/>

      <v-layout wrap>
        <v-flex sm6>
          <v-menu
            v-model="start"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="start_date"
                label="Start date"
                append-icon="event"
                hide-details
                outlined
                readonly
                :disabled="!season || disabled"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              color="primary"
              v-model="start_date"
              :min="minStartDate"
              :max="maxEndDate"
              no-title 
              @input="start = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex sm6>
          <v-menu
            v-model="end"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="end_date"
                label="End date"
                append-icon="event"
                hide-details
                readonly
                outlined
                :disabled="!season || disabled"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="primary"
              v-model="end_date"
              :min="minStartDate"
              :max="maxEndDate"
              no-title
              @input="end = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import { seasons } from '@/api'
  import paramsSync from '@/mixins/paramsSync'

  export default {
    name: 'season-selector',

    mixins: [paramsSync],

    watch: {
      season() {
        this.emitUpdate()
      },
      start_date() {
        this.emitUpdate()
      },
      end_date() {
        this.emitUpdate()
      }
    },

    created() {
      this.loading = true

      seasons()
        .then(results => {
          const newResults = results.map(r => {
            r.text = r.seasonname
            r.value = r.seasonname.split(' ')[1]

            return r
          })

          this.seasons = newResults
          this.loading = false
        })
        .catch(e => { 
          this.loading = false
          console.error(e)
        })
    },

    props: {
      disabled: Boolean,
    },

    data() {
      return {
        loading: false,
        seasons: [],
        season: '',
        minStartDate: '',
        maxEndDate: '',
        start: false, // v-menu
        end: false, // v-menu
        start_date: '',
        end_date: '',
        season: ''
      }
    },

    methods: {
      handleSeasonChange(val) {
        const season = this.seasons.find(s => s.seasonname.includes(val))

        this.start_date = this.minStartDate = season.startdate
        this.end_date = this.maxEndDate = season.enddate
      },
      emitUpdate() {
        this.$emit('update:params-sync', {
          start_date: this.start_date,
          end_date: this.end_date,
          season: this.season
        })
      }
    }
  }
</script>

<style lang="sass"></style>
