<template>
  <div class="preview-results grey--text text--lighten-1 pa-3">
    <div class="preview-results__query"><strong>Query:<slot></slot></strong></div>
    Results Preview
  </div>
</template>

<script>
  export default {
    name: 'preview-results'
  }
</script>

<style lang="stylus">
  .preview-results
    position: absolute
    top: 15px
    left: 15px
    right: 15px
    border: 2px dashed
    border-radius: 20px
    font-size: 18px
    text-align: center

    .preview-results__query
      font-size: 14px
</style>