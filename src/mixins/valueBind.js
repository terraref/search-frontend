export default {
  props: {
    value: null // TODO: might have broken tests
  },

  data() {
    return {
      mx_value: this.value
    }
  },

  watch: {
    value(newValue) {
      this.mx_value = newValue
    },
    mx_value() {
      this.$emit('input', this.mx_value)
    }
  }
}
