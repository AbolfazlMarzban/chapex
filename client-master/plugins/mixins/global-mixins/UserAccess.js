export default {
  methods: {
    CheckUserAccess(AccessIDs) {
      let userAccessId = this.$store.getters['login/getUserData']().TU_FID_Access
      for (const accessId of AccessIDs) {
        if (accessId == userAccessId) {
          return true
        }
      }
      return false
    }
  }
}
