<template>
  <v-app>
    <v-toolbar app flat clipped-left dark color="blue darken-2">
      <v-toolbar-title class="headline text-uppercase">
        <span>TERRA-REF </span>
        <span class="font-weight-light">Advanced Search</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    
    <!-- <v-footer fixed app color="green" height="auto">
      <v-layout justify-center>
        <v-btn color="white" flat depressed>Run Search</v-btn>
      </v-layout>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
