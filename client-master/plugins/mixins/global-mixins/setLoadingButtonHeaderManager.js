export default {
  methods: {
    setHeaderManagerButtonLoading(loading = false) {
      this.$store.dispatch("headerManager/setButtonLoading", loading);
    },
  }
}