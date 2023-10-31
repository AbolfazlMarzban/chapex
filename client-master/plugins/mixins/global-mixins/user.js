export default {
  computed: {
    User() {
      return this.$store.getters["login/getUserData"]()
    },

    profilePercent() {
      return this.$store.getters["login/getUserLevel"]()
    },

    profileProgressColor() {
      if (this.profilePercent <= 25)
        return 'red accent-4'

      if (this.profilePercent < 100)
        return 'blue accent-4'

      if (this.profilePercent == 100)
        return 'teal'
    }
  }
}
