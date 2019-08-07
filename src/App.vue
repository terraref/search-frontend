<template>
  <v-app class="terra-ref-app">
    <v-app-bar app flat clipped-left light color="white" height="75">
      <img src="/img/terra-ref-logo.png" alt="Terra Phenotyping Reference Platform" class="app__logo"/>
      <v-toolbar-title class="headline text-uppercase">  
        <span class="app__main-title">TERRA-REF </span>
        <span class="font-weight-light app__subtitle">Advanced Search</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style lang="sass">
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
      border-color: darken($color-light-gray, 5%) !important
</style>

