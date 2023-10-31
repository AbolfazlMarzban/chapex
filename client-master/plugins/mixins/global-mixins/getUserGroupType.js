export default {
    computed: {
        getUserGroupType() {
            return this.$store.getters['login/groupType']
        }
    }
}