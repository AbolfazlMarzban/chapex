
export default {
  computed: {
    cartItemsCount() {
      return this.$store.getters["login/cartItemsCount"];
    },
  }
}