<template>
  <v-app class="terra-ref-app">
    <v-toolbar app flat clipped-left light color="white">
      <img src="/img/terra-ref-logo.png" alt="Terra Phenotyping Reference Platform" class="app__logo"/>
      <v-toolbar-title class="headline text-uppercase">  
        <span class="app__main-title">TERRA-REF </span>
        <span class="font-weight-light app__subtitle">Advanced Search</span>
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
<style lang="stylus">
  .terra-ref-app
    .app__main-title
      font-size: 24px
      display: block
      line-height: 1
    
    .app__subtitle
      font-size: 18px
      display: block
      line-height: 1
    
    .app__logo
      max-height: 40px

    .v-toolbar
      border-bottom: 1px solid
      border-color: darken($theme.terra-gray.lighten1, 5%) !important
</style>

