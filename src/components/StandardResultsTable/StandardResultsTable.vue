<template>
  <v-card class="standard-results-table">
    <v-card-title>
      <img v-if="getLogo" :src="getLogo"/>
      <template v-else>
        {{ title }}
      </template>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Filter"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="results"
      :search="search">
      <template #item.download="{ item }">
        <v-btn :href="item.download" target="_blank" class="mr-0" block>Download</v-btn>
      </template>
      <template #item.view="{ item }">
        <v-btn :href="item.view" target="_blank" class="mr-0" block>View</v-btn>
      </template>
      <!-- <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">
          <v-btn :href="props.item.download" target="_blank" class="mr-0" block>Download</v-btn>
        </td>
        <td class="text-xs-right">
          <v-btn :href="props.item.view" target="_blank" class="mr-0" block>View</v-btn>
        </td>
      </template> -->
      <template #no-results>
        Your search for "{{ search }}" found no results.
        <!-- <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert> -->
      </template>
      <v-data-footer :items-per-page-options="[10, 25, 50]"></v-data-footer>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name: 'standard-results-table',

    props: {
      title: {
        type: String,
        required: true,
        default: ''
      },
      results: {
        type: Array,
        default: () => ([])
      }
    },

    data() {
      return {
        search: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Download Link', value: 'download', align: 'left' },
          { text: 'View Link', value: 'view', align: 'left' }
        ]
      }
    },

    computed: {
      getLogo() {
        const lookup = {
          'bety': '/img/betydb.png',
          'clowder': '/img/clowder.png'
        }

        return lookup[this.title.toLowerCase()]
      }
    }
  }
</script>

<style lang="sass">
  .standard-results-table
    .v-card__title
      img
        max-width: 115px
</style>