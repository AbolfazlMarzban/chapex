export default {
  async mounted() {
    await this.checkForStaticDataOrGetData()
  },
  computed: {
    staticSiteDefaultsInStore() {
      return this.$store.getters["staticSiteDefaults/staticSiteDefaultsData"]
    }
  },
  methods: {
    async checkForStaticDataOrGetData() {
      try {
        if (this.staticSiteDefaultsInStore.length == 0) {
          const data = await this.$axios.$get('/category-static-data')
          this.$store.dispatch('staticSiteDefaults/setData', data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    getStaticSiteDefaultsInStore(type) {
      let data
      for (let item of this.staticSiteDefaultsInStore) {
        if (item.TC_FFormType == type) {
          data = item
        }
      }
      if (data) {
        return data
      }
      return {
        TC_FCaption: '',
        TC_FAddPic1: '',
        TC_FComment: '',
        TC_FHtml: '',
        children: [],
      }
    }
  }
}