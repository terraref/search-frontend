export default {
  watch: {
    paramsSync: {
      handler(params) {
        for (const key in params) {
          this[key] = params[key]
        } 
      },
      deep: true,
      immediate: true
    }
  },

  props: {
    paramsSync: {
      type: Object,
      default: () => ({})
    }
  }
}