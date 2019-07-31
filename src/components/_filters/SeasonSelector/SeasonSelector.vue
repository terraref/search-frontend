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
        item-text="seasonname"
        label="Please select season"
        hide-details
        single-line
        outline
        class="mb-3"
        :disabled="disabled"
        @change="handleSeasonChange"/>

      <v-layout wrap>
        <v-flex sm6>
          <v-menu
            v-model="start"
            :close-on-content-click="false"
            lazy
            transition="scale-transition"
            offset-y
            full-width>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start date"
                append-icon="event"
                hide-details
                outline
                readonly
                :disabled="!season || disabled"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              color="primary"
              v-model="startDate"
              :min="startDate"
              :max="endDate"
              no-title 
              @input="start = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex sm6>
          <v-menu
            v-model="end"
            :close-on-content-click="false"
            lazy
            transition="scale-transition"
            offset-y
            full-width>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End date"
                append-icon="event"
                hide-details
                readonly
                outline
                :disabled="!season || disabled"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="primary"
              v-model="endDate"
              :min="startDate"
              :max="endDate"
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
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'season-selector',

    mixins: [valueBind],

    watch: {
      startDate() {
        this.emitQuery()
      },
      endDate() {
        this.emitQuery()
      }
    },

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

    props: {
      disabled: Boolean
    },

    data() {
      return {
        loading: false,
        seasons: [],
        season: '',
        start: false,
        startDate: '',
        end: false,
        endDate: ''
      }
    },

    methods: {
      handleSeasonChange(val) {
        this.startDate = this.seasons.find(s => s.seasonname === val).startdate
        this.endDate = this.seasons.find(s => s.seasonname === val).enddate

        this.emitQuery()
      },
      emitQuery() {
        const season = this.season.split(' ')[1]

        // this emits 'input' event, see valueBind mixin
        this.mx_value = `season=${season}&start_date=${this.startDate}&end_date=${this.endDate}`
      }
    }
  }
</script>

<style lang="stylus"></style>
