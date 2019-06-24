<template>
  <v-card class="pa-1">
    <!-- <v-card-title primary-title>
      <h2>Please select season:</h2>
    </v-card-title> -->

    <v-card-text>
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
        @change="handleChange"/>

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
                :disabled="!season"
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
                :disabled="!season"
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
  import { seasons } from '@/api/'
  import valueBind from '@/mixins/valueBind'

  export default {
    name: 'season-selector',

    mixins: [valueBind],

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
      handleChange(val) {
        this.mx_value = val

        this.startDate = this.seasons.find(s => s.seasonname === val).startdate
        this.endDate = this.seasons.find(s => s.seasonname === val).enddate
      }
    }
  }
</script>

<style lang="stylus"></style>
